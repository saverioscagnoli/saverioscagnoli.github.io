import type React from "react";
import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Mesh,
  NearestFilter,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderTarget
} from "three";

type CrtEffectProps = {
  aberration?: number;
  curvature?: number;
  scanlines?: number;
  flicker?: number;
  pixelSize?: number;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D tDiffuse;
  uniform vec2 resolution;
  uniform float time;
  uniform float aberration;
  uniform float curvature;
  uniform float scanlines;
  uniform float flicker;

  varying vec2 vUv;

  vec2 warp(vec2 uv) {
    vec2 c = uv * 2.0 - 1.0;
    c *= 1.0 + curvature * dot(c, c);
    return c * 0.5 + 0.5;
  }

  void main() {
    vec2 uv = warp(vUv);

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    vec2 offset = (uv - 0.5) * 2.0 * aberration / resolution;

    vec3 color = vec3(
      texture2D(tDiffuse, uv + offset).r,
      texture2D(tDiffuse, uv).g,
      texture2D(tDiffuse, uv - offset).b
    );

    if (mod(floor(gl_FragCoord.y), 3.0) == 0.0) {
      color *= 1.0 - scanlines;
    }

    vec2 v = vUv * (1.0 - vUv.yx);
    color *= pow(v.x * v.y * 16.0, 0.2);

    color *= 1.0 - flicker + flicker * sin(time * 8.0);

    gl_FragColor = vec4(color, 1.0);

    #include <colorspace_fragment>
  }
`;

const CrtEffect: React.FC<CrtEffectProps> = ({
  aberration = 3,
  curvature = 0.04,
  scanlines = 0.3,
  flicker = 0.02,
  pixelSize = 4
}) => {
  const { gl, scene, camera, size } = useThree();

  const target = useMemo(
    () =>
      new WebGLRenderTarget(1, 1, {
        minFilter: NearestFilter,
        magFilter: NearestFilter
      }),
    []
  );

  const { quadScene, quadCamera, geometry, material } = useMemo(() => {
    let geometry = new PlaneGeometry(2, 2);
    let material = new ShaderMaterial({
      uniforms: {
        tDiffuse: { value: target.texture },
        resolution: { value: new Vector2(1, 1) },
        time: { value: 0 },
        aberration: { value: 0 },
        curvature: { value: 0 },
        scanlines: { value: 0 },
        flicker: { value: 0 }
      },
      vertexShader,
      fragmentShader
    });

    let quadScene = new Scene();
    quadScene.add(new Mesh(geometry, material));

    return {
      quadScene,
      quadCamera: new OrthographicCamera(-1, 1, 1, -1, 0, 1),
      geometry,
      material
    };
  }, [target]);

  useEffect(() => {
    let buffer = gl.getDrawingBufferSize(new Vector2());

    target.setSize(
      Math.max(1, Math.floor(buffer.x / pixelSize)),
      Math.max(1, Math.floor(buffer.y / pixelSize))
    );
    material.uniforms.resolution.value.copy(buffer);
  }, [gl, size, pixelSize, target, material]);

  useEffect(
    () => () => {
      target.dispose();
      geometry.dispose();
      material.dispose();
    },
    [target, geometry, material]
  );

  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.elapsedTime;
    material.uniforms.aberration.value = aberration;
    material.uniforms.curvature.value = curvature;
    material.uniforms.scanlines.value = scanlines;
    material.uniforms.flicker.value = flicker;

    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.render(quadScene, quadCamera);
  }, 1);

  return null;
};

export { CrtEffect };
