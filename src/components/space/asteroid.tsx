import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { IcosahedronGeometry, Vector3, type Mesh } from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { pick, random } from "~/lib/utils";

type AsteroidProps = {
  position: [number, number, number];
  radius: number;
};

const COLORS = ["#6e6a65", "#8a8178", "#5b5550", "#9a9187"];

const Asteroid: React.FC<AsteroidProps> = ({ position, radius }) => {
  const ref = useRef<Mesh>(null);

  const [look] = useState(() => ({
    color: pick(COLORS),
    spin: [random(-0.6, 0.6), random(-0.6, 0.6)] as [number, number]
  }));

  const geometry = useMemo(() => {
    const base = new IcosahedronGeometry(radius, 1);
    base.deleteAttribute("normal");
    base.deleteAttribute("uv");

    let geo = mergeVertices(base);
    base.dispose();

    let position = geo.getAttribute("position");
    const v = new Vector3();

    for (let i = 0; i < position.count; i++) {
      v.fromBufferAttribute(position, i).multiplyScalar(random(0.7, 1.15));
      position.setXYZ(i, v.x, v.y, v.z);
    }

    geo.scale(1, random(0.6, 1), random(0.7, 1));
    geo.computeVertexNormals();

    return geo;
  }, [radius]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * look.spin[0];
      ref.current.rotation.y += delta * look.spin[1];
    }
  });

  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshStandardMaterial color={look.color} roughness={1} flatShading />
    </mesh>
  );
};

export { Asteroid };
