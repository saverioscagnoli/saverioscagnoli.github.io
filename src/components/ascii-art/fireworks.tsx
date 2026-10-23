import type React from "react";
import { useAsciiCanvas, type AsciiDraw } from "~/hooks/use-ascii-canvas";
import { random, randomInt } from "~/lib/utils";

type Rocket = {
  x: number;
  y: number;
  vy: number;
  target: number;
  hue: number;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  hue: number;
};

const SPARKS = "@*+:.";
const GRAVITY = 3;
const LAUNCH_RATE = 10;

const createFireworks = (): AsciiDraw => {
  let rockets: Rocket[] = [];
  let sparks: Spark[] = [];

  return (ctx, { cols, rows, cw, line }, _, delta) => {
    let squash = Math.min(1, rows / 8);

    if (Math.random() < LAUNCH_RATE * delta) {
      rockets.push({
        x: randomInt(2, Math.max(2, cols - 3)),
        y: rows,
        vy: -random(4, 7),
        target: random(0, rows * 0.4),
        hue: random(0, 360)
      });
    }

    for (let i = rockets.length - 1; i >= 0; i--) {
      let rocket = rockets[i];
      rocket.y += rocket.vy * delta;

      if (rocket.y > rocket.target) {
        continue;
      }

      rockets.splice(i, 1);

      for (let j = 0, count = randomInt(24, 40); j < count; j++) {
        let angle = random(0, Math.PI * 2);
        let speed = random(1, 4);
        let max = random(0.6, 1.4);

        sparks.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed * 2,
          vy: Math.sin(angle) * speed * squash,
          life: max,
          max,
          hue: rocket.hue + random(-20, 20)
        });
      }
    }

    sparks = sparks.filter(spark => {
      spark.life -= delta;
      spark.vy += GRAVITY * squash * delta;
      spark.x += spark.vx * delta;
      spark.y += spark.vy * delta;

      return spark.life > 0;
    });

    for (const spark of sparks) {
      let fade = spark.life / spark.max;
      let char =
        SPARKS[
          Math.min(SPARKS.length - 1, Math.floor((1 - fade) * SPARKS.length))
        ];

      ctx.fillStyle = `hsl(${spark.hue} 90% ${30 + fade * 40}%)`;
      ctx.fillText(char, Math.round(spark.x) * cw, Math.round(spark.y) * line);
    }

    for (const rocket of rockets) {
      ctx.fillStyle = "white";
      ctx.fillText("|", rocket.x * cw, Math.round(rocket.y) * line);
    }
  };
};

const Fireworks: React.FC<React.ComponentProps<"canvas">> = props => {
  const ref = useAsciiCanvas(createFireworks);

  return <canvas ref={ref} aria-hidden="true" {...props} />;
};

export { Fireworks };
