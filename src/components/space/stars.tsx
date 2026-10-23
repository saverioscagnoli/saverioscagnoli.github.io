import type React from "react";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type {
  BufferAttribute,
  Points,
  WebGLProgramParametersWithUniforms
} from "three";

type StarsProps = {
  count?: number;
  radius?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
  twinkleRatio?: number;
};

type Star = {
  base: number;
  size: number;
  twinkles: boolean;
  period: number;
  phase: number;
  depth: number;
};

const Stars: React.FC<StarsProps> = ({
  count = 3000,
  radius = 1500,
  speed = 0.01,
  minSize = 2,
  maxSize = 6,
  twinkleRatio = 0.4
}) => {
  const ref = useRef<Points>(null);
  const colorRef = useRef<BufferAttribute>(null);

  const positions = useMemo(() => {
    let arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let r = radius * (0.5 + Math.random() * 0.5);
      let theta = Math.random() * Math.PI * 2;
      let phi = Math.acos(2 * Math.random() - 1);

      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }

    return arr;
  }, [count, radius]);

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, () => ({
        base: 0.3 + 0.7 * Math.random() ** 2,
        size: Math.round(minSize + (maxSize - minSize) * Math.random() ** 3),
        twinkles: Math.random() < twinkleRatio,
        period: 1.5 + Math.random() * 4.5,
        phase: Math.random() * Math.PI * 2,
        depth: 0.4 + Math.random() * 0.6
      })),
    [count, twinkleRatio, minSize, maxSize]
  );

  const colors = useMemo(() => {
    let arr = new Float32Array(count * 3);

    stars.forEach((star, i) => arr.fill(star.base, i * 3, i * 3 + 3));

    return arr;
  }, [count, stars]);

  const sizes = useMemo(
    () => Float32Array.from(stars, star => star.size),
    [stars]
  );

  const applyStarSize = (shader: WebGLProgramParametersWithUniforms) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        "uniform float size;",
        "uniform float size;\nattribute float starSize;"
      )
      .replace("gl_PointSize = size;", "gl_PointSize = starSize;");
  };

  useFrame(({ clock }, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }

    if (!colorRef.current) {
      return;
    }

    let t = clock.elapsedTime;

    stars.forEach((star, i) => {
      if (!star.twinkles) {
        return;
      }

      let wave =
        0.5 + 0.5 * Math.sin((t * Math.PI * 2) / star.period + star.phase);
      let v = star.base * (1 - star.depth * wave ** 4);

      colors.fill(v, i * 3, i * 3 + 3);
    });

    colorRef.current.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute
          ref={colorRef}
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute attach="attributes-starSize" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        sizeAttenuation={false}
        vertexColors
        onBeforeCompile={applyStarSize}
      />
    </points>
  );
};

export { Stars };
