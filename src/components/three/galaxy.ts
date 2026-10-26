import * as THREE from "three";
import { pick, rng, rngInt } from "~/lib/utils";

const CORE = new THREE.Color(1, 0.85, 0.6);
const EDGES = [new THREE.Color(0.5, 0.6, 1), new THREE.Color(0.8, 0.5, 1)];
const RADIUS = 0.5;

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

function createGalaxy(count = 1500, core = 200) {
  let arms = rngInt(2, 4);
  let twist = rng(3, 5);
  let edge = pick(EDGES);
  let positions = new Float32Array((count + core) * 3);
  let colors = new Float32Array((count + core) * 3);
  let color = new THREE.Color();

  for (let i = 0; i < count + core; i++) {
    let isCore = i >= count;
    let t = isCore ? Math.abs(gauss()) * 0.08 : Math.random() ** 1.5;
    let angle = isCore
      ? Math.random() * Math.PI * 2
      : ((i % arms) / arms) * Math.PI * 2 + t * twist + gauss() * 0.4 * (1 - t * 0.5);
    let r = RADIUS * t;

    positions[i * 3] = r * Math.cos(angle);
    positions[i * 3 + 1] = gauss() * RADIUS * 0.03;
    positions[i * 3 + 2] = r * Math.sin(angle);

    color
      .copy(CORE)
      .lerp(edge, Math.min(t * 1.5, 1))
      .multiplyScalar(rng(0.4, 1) * (1 - t * 0.5));

    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  let points = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  );

  let tilt = new THREE.Group();
  tilt.rotation.x = Math.PI / 2 - rng(0, 0.8);
  tilt.add(points);

  let group = new THREE.Group();
  group.rotation.z = rng(0, Math.PI * 2);
  group.add(tilt);

  return { group, points, spin: rng(0.01, 0.03) };
}

export { createGalaxy };
