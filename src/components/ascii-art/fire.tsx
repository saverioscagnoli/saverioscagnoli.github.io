import type React from "react";
import {
  useAsciiCanvas,
  type AsciiDraw
} from "~/components/hooks/use-ascii-canvas";
import { random } from "~/lib/utils";

const RAMP = " .:-=+*";
const SMOOTHING = 0.15;

const createFire = (): AsciiDraw => {
  let heat = new Float32Array(0);
  let fuel = new Float32Array(0);
  let cols = 0;
  let rows = 0;

  return (ctx, grid) => {
    if (grid.cols !== cols || grid.rows !== rows) {
      cols = grid.cols;
      rows = grid.rows;
      heat = new Float32Array(cols * rows);
      fuel = Float32Array.from({ length: cols }, () => random(0.5, 0.85));
    }

    let decay = 1.5 / rows;
    let next = new Float32Array(cols * rows);

    for (let x = 0; x < cols; x++) {
      fuel[x] = Math.min(0.85, Math.max(0.5, fuel[x] + random(-0.04, 0.04)));
    }

    for (let x = 0; x < cols; x++) {
      let left = fuel[Math.max(0, x - 1)];
      let right = fuel[Math.min(cols - 1, x + 1)];

      next[(rows - 1) * cols + x] = (left + fuel[x] * 2 + right) / 4;
    }

    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols; x++) {
        let row = (y + 1) * cols;
        let left = heat[row + Math.max(0, x - 1)];
        let right = heat[row + Math.min(cols - 1, x + 1)];
        let below = (left + heat[row + x] * 2 + right) / 4;

        next[y * cols + x] = Math.max(0, below - random(0, decay));
      }
    }

    for (let i = 0; i < heat.length; i++) {
      heat[i] += (next[i] - heat[i]) * SMOOTHING;
    }

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let h = heat[y * cols + x];
        let char = RAMP[Math.min(RAMP.length - 1, Math.floor(h * RAMP.length))];

        if (char === " ") {
          continue;
        }

        ctx.fillStyle = `hsl(${h * 45} 80% ${10 + h * 40}%)`;
        ctx.fillText(char, x * grid.cw, y * grid.line);
      }
    }
  };
};

const Fire: React.FC<React.ComponentProps<"canvas">> = props => {
  const ref = useAsciiCanvas(createFire);

  return <canvas ref={ref} aria-hidden="true" {...props} />;
};

export { Fire };
