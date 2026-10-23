import type React from "react";
import { useAsciiCanvas, type AsciiDraw } from "~/hooks/use-ascii-canvas";
import { random } from "~/lib/utils";

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  trail: [number, number][];
};

const SPACING = 9;
const GRAVITY = 12;
const BOUNCE = 0.9;
const TRAIL = ["o", "."];

const createBouncingBalls = (): AsciiDraw => {
  let balls: Ball[] = [];
  let cols = 0;
  let rows = 0;

  return (ctx, grid, _, delta) => {
    if (grid.cols !== cols || grid.rows !== rows) {
      cols = grid.cols;
      rows = grid.rows;
      balls = Array.from(
        { length: Math.max(1, Math.round(cols / SPACING)) },
        () => ({
          x: random(0, cols - 1),
          y: random(0, rows - 1),
          vx: random(6, 15) * (Math.random() < 0.5 ? -1 : 1),
          vy: random(-6, 0),
          hue: random(0, 360),
          trail: []
        })
      );
    }

    let floor = rows - 1;
    let kick = Math.sqrt(2 * GRAVITY * floor);

    for (const ball of balls) {
      let before: [number, number] = [Math.round(ball.x), Math.round(ball.y)];

      ball.vy += GRAVITY * delta;
      ball.x += ball.vx * delta;
      ball.y += ball.vy * delta;

      if (ball.x < 0 || ball.x > cols - 1) {
        ball.x = Math.min(cols - 1, Math.max(0, ball.x));
        ball.vx = -ball.vx;
      }

      if (ball.y > floor) {
        ball.y = floor;
        ball.vy = -Math.max(Math.abs(ball.vy) * BOUNCE, kick * random(0.6, 1));
      }

      if (ball.y < 0) {
        ball.y = 0;
        ball.vy = Math.abs(ball.vy);
      }

      if (
        Math.round(ball.x) !== before[0] ||
        Math.round(ball.y) !== before[1]
      ) {
        ball.trail.unshift(before);
        ball.trail.length = Math.min(ball.trail.length, TRAIL.length);
      }
    }

    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        let a = balls[i];
        let b = balls[j];

        if (Math.abs(a.x - b.x) < 1 && Math.abs(a.y - b.y) < 1) {
          [a.vx, b.vx] = [b.vx, a.vx];
          [a.vy, b.vy] = [b.vy, a.vy];
        }
      }
    }

    for (const ball of balls) {
      ball.trail.forEach(([x, y], k) => {
        ctx.fillStyle = `hsl(${ball.hue} 60% ${35 - k * 12}%)`;
        ctx.fillText(TRAIL[k], x * grid.cw, y * grid.line);
      });

      ctx.fillStyle = `hsl(${ball.hue} 70% 65%)`;
      ctx.fillText(
        "O",
        Math.round(ball.x) * grid.cw,
        Math.round(ball.y) * grid.line
      );
    }
  };
};

const BouncingBalls: React.FC<React.ComponentProps<"canvas">> = props => {
  const ref = useAsciiCanvas(createBouncingBalls);

  return <canvas ref={ref} aria-hidden="true" {...props} />;
};

export { BouncingBalls };
