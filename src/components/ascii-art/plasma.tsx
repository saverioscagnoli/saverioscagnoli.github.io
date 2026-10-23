import type React from "react";
import {
  useAsciiCanvas,
  type AsciiDraw
} from "~/components/hooks/use-ascii-canvas";

const RAMP = " .:-=+*#%@";

const sample = (
  x: number,
  y: number,
  t: number,
  cols: number,
  rows: number
) => {
  let cx = cols / 2 + (cols / 3) * Math.sin(t / 5);
  let cy = rows / 2 + Math.cos(t / 3);

  const v =
    Math.sin(x / 8 + t) +
    Math.sin((x / 16 + y) / 2 + t * 1.3) +
    Math.sin(Math.hypot(x - cx, (y - cy) * 2) / 6 - t) +
    Math.sin((x + y * 2) / 12 - t * 1.5);

  return (v + 4) / 8;
};

const createPlasma =
  (): AsciiDraw =>
  (ctx, { cols, rows, cw, line }, t) => {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let n = sample(x, y, t, cols, rows);
        let char = RAMP[Math.min(RAMP.length - 1, Math.floor(n * RAMP.length))];

        if (char === " ") {
          continue;
        }

        ctx.fillStyle = `hsl(${(n * 360 + t * 20) % 360} 70% ${30 + n * 30}%)`;
        ctx.fillText(char, x * cw, y * line);
      }
    }
  };

const Plasma: React.FC<React.ComponentProps<"canvas">> = props => {
  const ref = useAsciiCanvas(createPlasma);

  return <canvas ref={ref} aria-hidden="true" {...props} />;
};

export { Plasma };
