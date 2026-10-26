import { useThree } from "~/hooks/use-three";
import * as THREE from "three";
import { cn, rng, rngInt } from "~/lib/utils";
import { createSprite } from "./sprite";
import { createAsteroidCluster } from "./asteroid";
import { createGalaxy } from "./galaxy";

const COUNT = 4000;
const PIXEL_SIZE = 2;

const createGlow = () => {
  let canvas = document.createElement("canvas");
  canvas.width = canvas.height = 3;

  let ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(1, 0, 1, 3);
  ctx.fillRect(0, 1, 3, 1);
  ctx.fillStyle = "white";
  ctx.fillRect(1, 1, 1, 1);

  let texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  return texture;
};

type SpaceProps = {
  onReady?: () => void;
} & React.ComponentProps<"canvas">;

const Space: React.FC<SpaceProps> = ({
  className,
  onReady,
  ...props
}) => {
  let ref = useThree(async ({ scene, camera, reduced, invalidate }) => {
    let positions = new Float32Array(COUNT * 3);
    let phases = new Float32Array(COUNT);
    let speeds = new Float32Array(COUNT);
    let sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      let v = new THREE.Vector3()
        .randomDirection()
        .multiplyScalar(rng(50, 200));
      positions.set([v.x, v.y, v.z], i * 3);
      phases[i] = rng(0, Math.PI * 2);
      speeds[i] = rng(0.5, 3);
      sizes[i] = Math.random() < 0.15 ? 3 : 1;
    }

    let geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute("starSize", new THREE.BufferAttribute(sizes, 1));

    let glow = createGlow();
    let stars = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: PIXEL_SIZE,
        sizeAttenuation: false,
        map: glow,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      })
    );

    let time = { value: 0 };

    stars.material.onBeforeCompile = shader => {
      shader.uniforms.time = time;

      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
          attribute float phase;
          attribute float speed;
          attribute float starSize;
          uniform float time;
          varying float vFlicker;`
        )
        .replace("gl_PointSize = size;", "gl_PointSize = size * starSize;")
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          float wave = 0.5 + 0.5 * sin(time * speed + phase);
          vFlicker = 0.3 + 0.7 * floor(wave * 3.999) / 3.0;`
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
          varying float vFlicker;`
        )
        .replace(
          "#include <opaque_fragment>",
          `outgoingLight *= vFlicker;
          #include <opaque_fragment>`
        );
    };


    scene.add(stars);


    let spriteOptions = { still: reduced, onFrame: invalidate };
    let planets = [1, 2, 3, 4, 5, 6]
      .sort(() => Math.random() - 0.5)
      .slice(0, rngInt(2, 3));

    let bodies: { mesh: THREE.Object3D; scale: number }[] = await Promise.all([
      createSprite("blackhole-1.webm", spriteOptions).then(mesh => ({
        mesh,
        scale: 3.2
      })),
      ...planets.map(n =>
        createSprite(`planet-${n}.webm`, spriteOptions).then(mesh => ({
          mesh,
          scale: 1.8
        }))
      )
    ]);

    let clusters = Array.from({ length: 3 }, () => createAsteroidCluster());
    let asteroids = clusters.flatMap(({ asteroids }) => asteroids);

    bodies.push(...clusters.map(({ group }) => ({ mesh: group, scale: rng(3, 4.5) })));

    let galaxies = Array.from({ length: 6 }, () => createGalaxy());

    bodies.push(...galaxies.map(({ group }) => ({ mesh: group, scale: rng(2.5, 3.5) })));

    let sun = new THREE.DirectionalLight(0xffffff, 2.5);
    sun.position.set(-3, 2, 4);
    scene.add(sun, new THREE.AmbientLight(0xffffff, 0.25));

    let tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    let aspect = window.innerWidth / window.innerHeight;
    let placed: { x: number; y: number; r: number }[] = [];
    let layout: {
      mesh: THREE.Object3D;
      nx: number;
      ny: number;
      halfW: number;
      distance: number;
    }[] = [];

    let avoid = Array.from(document.querySelectorAll("[data-space-avoid]"), el => {
      let rect = el.getBoundingClientRect();

      return {
        left: (rect.left / window.innerWidth) * 2 * aspect - aspect,
        right: (rect.right / window.innerWidth) * 2 * aspect - aspect,
        top: 1 - (rect.top / window.innerHeight) * 2,
        bottom: 1 - (rect.bottom / window.innerHeight) * 2
      };
    });

    const place = (r: number) => {
      let best = { x: 0, y: 0, gap: -Infinity };

      for (let k = 0; k < 500 && (k < 30 || best.gap <= 0); k++) {
        let x = rng(-aspect + r, aspect - r);
        let y = rng(-1 + r, 1 - r);
        let gap = Math.min(
          ...placed.map(p => Math.hypot(p.x - x, p.y - y) - p.r - r),
          ...avoid.map(
            a =>
              Math.hypot(
                x - THREE.MathUtils.clamp(x, a.left, a.right),
                y - THREE.MathUtils.clamp(y, a.bottom, a.top)
              ) - r
          )
        );

        if (gap > best.gap) best = { x, y, gap };
      }

      placed.push({ x: best.x, y: best.y, r });
      return best;
    };

    bodies
      .map(body => ({ ...body, distance: rng(20, 60) }))
      .sort((a, b) => b.scale / b.distance - a.scale / a.distance)
      .forEach(({ mesh, scale, distance }) => {
        let halfH = distance * tanHalf;
        let size = scale / distance;
        let r = size * Math.max(1, mesh.scale.x);
        let { x, y } = place(r);

        layout.push({
          mesh,
          nx: x / aspect,
          ny: y,
          halfW: size * mesh.scale.x,
          distance
        });
        mesh.scale.multiplyScalar(2 * size * halfH);

        scene.add(mesh);
      });

    const reposition = () => {
      for (let { mesh, nx, ny, halfW, distance } of layout) {
        let halfH = distance * tanHalf;
        let maxX = Math.max(0, 1 - halfW / camera.aspect);

        mesh.position.set(
          THREE.MathUtils.clamp(nx, -maxX, maxX) * halfH * camera.aspect,
          ny * halfH,
          camera.position.z - distance
        );
      }
    };

    return {
      update: (dt, elapsed) => {
        time.value = elapsed;
        stars.rotation.y += dt * 0.0001;

        for (let { mesh, spin } of asteroids) {
          mesh.rotation.x += spin.x * dt;
          mesh.rotation.y += spin.y * dt;
          mesh.rotation.z += spin.z * dt;
        }

        for (let { points, spin } of galaxies) {
          points.rotation.y += spin * dt;
        }
      },
      resize: reposition,
      dispose: () => {
        stars.geometry.dispose();
        stars.material.dispose();
        glow.dispose();

        for (let { mesh } of asteroids) {
          mesh.geometry.dispose();
          mesh.material.dispose();
        }

        for (let { points } of galaxies) {
          points.geometry.dispose();
          points.material.dispose();
        }
      }
    };
  }, PIXEL_SIZE, onReady);

  return (
    <canvas
      ref={ref}
      className={cn("[image-rendering:pixelated]", className)}
      {...props}
    />
  );
};

export { Space };
