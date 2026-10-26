import * as THREE from "three";
import { rng } from "~/lib/utils";

const DISTANCE = 30;
const SIZE = 0.06;
const LIGHTS = 8;
const LIT = new THREE.Color(0xffee66);
const DIM = new THREE.Color(0x553300);

function createUfo(camera: THREE.PerspectiveCamera) {
  let geometries: THREE.BufferGeometry[] = [];
  let materials: THREE.Material[] = [];

  const track = <G extends THREE.BufferGeometry, M extends THREE.Material>(
    geometry: G,
    material: M
  ) => {
    geometries.push(geometry);
    materials.push(material);
    return new THREE.Mesh(geometry, material);
  };

  let hull = track(
    new THREE.LatheGeometry(
      [
        new THREE.Vector2(0, -0.12),
        new THREE.Vector2(0.3, -0.1),
        new THREE.Vector2(0.5, 0),
        new THREE.Vector2(0.3, 0.08),
        new THREE.Vector2(0, 0.1)
      ],
      12
    ),
    new THREE.MeshStandardMaterial({
      color: 0x9aa3ad,
      metalness: 0.3,
      roughness: 0.6,
      flatShading: true
    })
  );

  let dome = track(
    new THREE.SphereGeometry(0.2, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({
      color: 0x66ffcc,
      emissive: 0x116644,
      flatShading: true
    })
  );
  dome.position.y = 0.08;

  let ufo = new THREE.Group();
  ufo.add(hull, dome);
  ufo.visible = false;

  let lights = Array.from({ length: LIGHTS }, (_, i) => {
    let angle = (i / LIGHTS) * Math.PI * 2;
    let light = track(
      new THREE.BoxGeometry(0.06, 0.06, 0.06),
      new THREE.MeshBasicMaterial({ color: DIM })
    );

    light.position.set(Math.cos(angle) * 0.42, 0, Math.sin(angle) * 0.42);
    ufo.add(light);

    return light;
  });

  let direction = 1;
  let speed = 0;
  let baseY = 0;
  let elapsed = 0;
  let wait = 40;

  const bounds = () => {
    let halfH = DISTANCE * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    return { halfH, halfW: halfH * camera.aspect };
  };

  const spawn = () => {
    let { halfH, halfW } = bounds();
    let scale = SIZE * 2 * halfH;

    direction = Math.random() < 0.5 ? -1 : 1;
    speed = (halfW * 2) / rng(6, 10);
    baseY = rng(-0.6, 0.8) * halfH;
    elapsed = 0;

    ufo.scale.setScalar(scale);
    ufo.position.set(
      -direction * (halfW + scale),
      baseY,
      camera.position.z - DISTANCE
    );
    ufo.rotation.set(0.25, 0, 0);
    ufo.visible = true;
  };

  const update = (dt: number) => {
    if (!ufo.visible) {
      wait -= dt;
      if (wait <= 0) spawn();
      return;
    }

    let { halfH, halfW } = bounds();

    elapsed += dt;
    ufo.position.x += direction * speed * dt;
    ufo.position.y = baseY + Math.sin(elapsed * 2) * halfH * 0.03;
    ufo.rotation.y += dt * 2;
    ufo.rotation.z = -direction * 0.1 + Math.sin(elapsed * 3) * 0.05;

    let lit = Math.floor(elapsed / 0.15) % LIGHTS;

    lights.forEach((light, i) => {
      light.material.color.copy(i === lit ? LIT : DIM);
    });

    if (Math.abs(ufo.position.x) > halfW + ufo.scale.x) {
      ufo.visible = false;
      wait = rng(40, 60);
    }
  };

  const dispose = () => {
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
  };

  return { ufo, update, dispose };
}

export { createUfo };
