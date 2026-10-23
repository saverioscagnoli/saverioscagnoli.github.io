import type React from "react";
import { useAsciiCanvas, type AsciiDraw } from "~/hooks/use-ascii-canvas";
import { random } from "~/lib/utils";

type Star = {
  x: number;
  y: number;
  z: number;
};

const CHARS = ".:+*#";
const DENSITY = 0.12;
const SPEED = 0.35;
const NEAR = 0.05;

const spawn = (z = random(NEAR, 1)): Star => ({
  x: random(-1, 1),
  y: random(-1, 1),
  z
});

const createStarfield = (): AsciiDraw => {
  let stars: Star[] = [];
  let cols = 0;
  let rows = 0;

  return (ctx, grid, _, delta) => {
    if (grid.cols !== cols || grid.rows !== rows) {
      cols = grid.cols;
      rows = grid.rows;
      stars = Array.from({ length: Math.round(cols * rows * DENSITY) }, () =>
        spawn()
      );
    }

    let cx = cols / 2;
    let cy = rows / 2;

    for (let i = 0; i < stars.length; i++) {
      let star = stars[i];
      star.z -= SPEED * delta;

      let sx = Math.round(cx + (star.x / star.z) * cx * 0.5);
      let sy = Math.round(cy + (star.y / star.z) * cy * 0.5);

      if (star.z <= NEAR || sx < 0 || sx >= cols || sy < 0 || sy >= rows) {
        stars[i] = spawn(1);
        continue;
      }

      let near = 1 - star.z;
      let char =
        CHARS[Math.min(CHARS.length - 1, Math.floor(near * CHARS.length))];

      ctx.fillStyle = `hsl(220 30% ${25 + near * 70}%)`;
      ctx.fillText(char, sx * grid.cw, sy * grid.line);
    }
  };
};

const Starfield: React.FC<React.ComponentProps<"canvas">> = props => {
  const ref = useAsciiCanvas(createStarfield);

  return <canvas ref={ref} aria-hidden="true" {...props} />;
};

export { Starfield };
