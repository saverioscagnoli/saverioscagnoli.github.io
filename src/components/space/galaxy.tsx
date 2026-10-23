import type React from "react";
import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, type Points } from "three";
import { pick, random, randomInt } from "~/lib/utils";

type GalaxyProps = {
  position: [number, number, number];
  radius: number;
};

const CORE = new Color(1, 0.85, 0.6);
const EDGES = [new Color(0.5, 0.6, 1), new Color(0.8, 0.5, 1)];

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

const Galaxy: React.FC<GalaxyProps> = ({ position, radius }) => {
  const ref = useRef<Points>(null);

  const [look] = useState(() => ({
    arms: randomInt(2, 4),
    twist: random(3, 5),
    edge: pick(EDGES),
    tilt: Math.PI / 2 - random(0, 0.8),
    roll: random(0, Math.PI * 2),
    spin: random(0.01, 0.03)
  }));

  const [positions, colors] = useMemo(() => {
    let count = 1500;
    let core = 200;
    let positions = new Float32Array((count + core) * 3);
    let colors = new Float32Array((count + core) * 3);
    let color = new Color();

    for (let i = 0; i < count + core; i++) {
      let isCore = i >= count;
      let t = isCore ? Math.abs(gauss()) * 0.08 : Math.random() ** 1.5;
      let angle = isCore
        ? Math.random() * Math.PI * 2
        : ((i % look.arms) / look.arms) * Math.PI * 2 +
          t * look.twist +
          gauss() * 0.4 * (1 - t * 0.5);
      let r = radius * t;

      positions[i * 3] = r * Math.cos(angle);
      positions[i * 3 + 1] = gauss() * radius * 0.03;
      positions[i * 3 + 2] = r * Math.sin(angle);

      color
        .copy(CORE)
        .lerp(look.edge, Math.min(t * 1.5, 1))
        .multiplyScalar(random(0.4, 1) * (1 - t * 0.5));

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [radius, look]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * look.spin;
    }
  });

  return (
    <group position={position} rotation={[0, 0, look.roll]}>
      <group rotation={[look.tilt, 0, 0]}>
        <points ref={ref}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={1}
            sizeAttenuation={false}
            vertexColors
            transparent
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </group>
  );
};

export { Galaxy };
