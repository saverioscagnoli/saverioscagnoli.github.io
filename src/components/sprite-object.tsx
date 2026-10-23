import type React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { SpriteMaterial } from "three";
import { useSpriteTexture } from "~/components/hooks/use-sprite-texture";

type SpriteObjectProps = {
  url: string;
  position: [number, number, number];
  radius: number;
  spin?: number;
};

const SpriteObject: React.FC<SpriteObjectProps> = ({
  url,
  position,
  radius,
  spin = 0
}) => {
  const texture = useSpriteTexture(url);
  const ref = useRef<SpriteMaterial>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation += delta * spin;
    }
  });

  if (!texture) {
    return null;
  }

  return (
    <sprite position={position} scale={[radius * 2, radius * 2, 1]}>
      <spriteMaterial ref={ref} map={texture} transparent depthWrite={false} />
    </sprite>
  );
};

export { SpriteObject };
