import type React from "react";
import { useAsciiCanvas, type AsciiDraw } from "~/hooks/use-ascii-canvas";
import { random } from "~/lib/utils";

type Emitter = {
  x: number;
  y: number;
  period: number;
  phase: number;
};

const EMITTERS = 3;
const SPEED = 8;
const RANGE = 30;
const THICKNESS = 1;

const createRadioWaves = (): AsciiDraw => {
  let emitters: Emitter[] = [];
  let cols = 0;
  let rows = 0;

  return (ctx, grid, t) => {
    if (grid.cols !== cols || grid.rows !== rows) {
      cols = grid.cols;
      rows = grid.rows;
      emitters = Array.from({ length: EMITTERS }, (_, i) => ({
        x: Math.round(((i + random(0.2, 0.8)) / EMITTERS) * cols),
        y: Math.floor(rows / 2),
        period: random(1.5, 3),
        phase: random(0, 3)
      }));
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let strength = 0;
        let char = "";

        for (const emitter of emitters) {
          let dx = x - emitter.x;
          let d = Math.hypot(dx, (y - emitter.y) * 2);

          if (d > RANGE) {
            continue;
          }

          let age = t - emitter.phase;
          let wave = ((age * SPEED - d) % (emitter.period * SPEED)) / SPEED;
          let behind = (wave + emitter.period) % emitter.period;

          if (behind * SPEED > THICKNESS) {
            continue;
          }

          let s = 1 - d / RANGE;

          if (s > strength) {
            strength = s;
            char = dx > 0.5 ? ")" : dx < -0.5 ? "(" : "-";
          }
        }

        if (!char) {
          continue;
        }

        ctx.fillStyle = `hsl(160 70% ${15 + strength * 50}%)`;
        ctx.fillText(char, x * grid.cw, y * grid.line);
      }
    }

    for (const emitter of emitters) {
      const pulse =
        0.5 +
        0.5 * Math.sin(((t - emitter.phase) / emitter.period) * Math.PI * 2);

      ctx.fillStyle = `hsl(160 80% ${40 + pulse * 40}%)`;
      ctx.fillText("*", emitter.x * grid.cw, emitter.y * grid.line);
    }
  };
};

const RadioWaves: React.FC<React.ComponentProps<"canvas">> = props => {
  const ref = useAsciiCanvas(createRadioWaves);

  return <canvas ref={ref} aria-hidden="true" {...props} />;
};

export { RadioWaves };
