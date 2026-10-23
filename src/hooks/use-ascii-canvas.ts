import { useEffect, useRef } from "react";

export type Grid = {
  cols: number;
  rows: number;
  cw: number;
  line: number;
};

export type AsciiDraw = (
  ctx: CanvasRenderingContext2D,
  grid: Grid,
  time: number,
  delta: number
) => void;

export function useAsciiCanvas(create: () => AsciiDraw, fps = 20, line = 16) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas = ref.current;
    let ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    let draw = create();
    let reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let grid: Grid = { cols: 0, rows: 0, cw: 8, line };
    let frame = 0;
    let last = 0;
    let stopped = false;

    const resize = () => {
      let dpr = window.devicePixelRatio || 1;
      let { width, height } = canvas.getBoundingClientRect();

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${line}px ${getComputedStyle(canvas).fontFamily}`;
      ctx.textBaseline = "top";

      grid.cw = ctx.measureText("M").width;
      grid.cols = Math.ceil(width / grid.cw);
      grid.rows = Math.ceil(height / line);
    };

    const render = (time: number, delta: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, grid, time / 1000, delta);
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);

      if (time - last < 1000 / fps) {
        return;
      }

      render(time, last ? Math.min((time - last) / 1000, 0.1) : 0);
      last = time;
    };

    const observer = new ResizeObserver(() => {
      resize();
      render(performance.now(), 0);
    });

    document.fonts.ready.then(() => {
      if (stopped) {
        return;
      }

      observer.observe(canvas);

      if (!reduced) {
        frame = requestAnimationFrame(loop);
      }
    });

    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [create, fps, line]);

  return ref;
}
