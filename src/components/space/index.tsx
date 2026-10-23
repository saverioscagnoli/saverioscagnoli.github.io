import type React from "react";
import { useState } from "react";
import { useThree } from "@react-three/fiber";
import { pick, randomInt } from "~/lib/utils";
import { layout, type KindConfig } from "~/lib/layout";
import { Asteroid } from "~/components/space/asteroid";
import { Galaxy } from "~/components/space/galaxy";
import { SpriteObject } from "~/components/sprite-object";

type Kind = "black-hole" | "galaxy" | "planet" | "asteroid";

const KINDS: Record<Kind, KindConfig> = {
  "black-hole": { size: [0.1, 0.14], depth: [500, 600] },
  galaxy: { size: [0.15, 0.25], depth: [600, 700] },
  planet: { size: [0.04, 0.08], depth: [300, 500] },
  asteroid: { size: [0.015, 0.035], depth: [150, 300] }
};

const BLACK_HOLES = ["/blackhole-1.gif"];
const PLANETS = Array.from({ length: 6 }, (_, i) => `/planet-${i + 1}.gif`);

const shuffle = <T,>(items: T[]) =>
  items
    .map(item => ({ item, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map(({ item }) => item);

const createItems = (): { kind: Kind; url?: string }[] => [
  { kind: "black-hole", url: pick(BLACK_HOLES) },
  ...Array.from({ length: Math.random() < 0.4 ? 2 : 1 }, () => ({
    kind: "galaxy" as const
  })),
  ...shuffle(PLANETS)
    .slice(0, randomInt(2, 4))
    .map(url => ({ kind: "planet" as const, url })),
  ...Array.from({ length: randomInt(10, 16) }, () => ({
    kind: "asteroid" as const
  }))
];

const Space: React.FC = () => {
  let aspect = useThree(state => state.size.width / state.size.height);
  let [placements] = useState(() => layout(aspect, createItems(), KINDS));

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[1, 0.5, 0.5]} intensity={2.5} />
      {placements.map((p, i) => {
        switch (p.kind) {
          case "galaxy":
            return <Galaxy key={i} position={p.position} radius={p.radius} />;
          case "black-hole":
          case "planet":
            return (
              <SpriteObject
                key={i}
                url={p.url!}
                position={p.position}
                radius={p.radius}
              />
            );
          case "asteroid":
            return <Asteroid key={i} position={p.position} radius={p.radius} />;
        }
      })}
    </>
  );
};

export { Space };
