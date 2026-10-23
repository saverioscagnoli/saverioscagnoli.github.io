import { random } from "~/lib/utils";

export type KindConfig = {
  size: [number, number];
  depth: [number, number];
};

export type Placement = {
  x: number;
  y: number;
  size: number;
  position: [number, number, number];
  radius: number;
};

const TAN = Math.tan(((75 / 2) * Math.PI) / 180);
const CENTER = 0.3;
const GAP = 1.15;
const ATTEMPTS = 100;

export function layout<K extends string, T extends { kind: K }>(
  aspect: number,
  items: T[],
  config: Record<K, KindConfig>
): (T & Placement)[] {
  const placements: (T & Placement)[] = [];

  for (const item of items) {
    let { size: sizeRange, depth: depthRange } = config[item.kind];

    for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
      let size = random(...sizeRange);
      let x = random(-aspect + size, aspect - size);
      let y = random(-1 + size, 1 - size);

      let inCenter = Math.abs(x) < CENTER * aspect && Math.abs(y) < CENTER;
      let overlaps = placements.some(
        p => Math.hypot(p.x - x, p.y - y) < (p.size + size) * GAP
      );

      if (inCenter || overlaps) {
        continue;
      }

      let depth = random(...depthRange);

      placements.push({
        ...item,
        x,
        y,
        size,
        position: [x * depth * TAN, y * depth * TAN, -depth],
        radius: size * depth * TAN
      });

      break;
    }
  }

  return placements;
}
