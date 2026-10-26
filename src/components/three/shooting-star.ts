import * as THREE from "three";
import { rng } from "~/lib/utils";

const DISTANCE = 40;

function createShootingStar(camera: THREE.PerspectiveCamera) {
  let positions = new Float32Array(6);
  let geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array([1, 1, 1, 0, 0, 0]), 3)
  );

  let material = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  let line = new THREE.Line(geometry, material);
  line.visible = false;
  line.frustumCulled = false;

  let head = new THREE.Vector3();
  let dir = new THREE.Vector3();
  let speed = 0;
  let length = 0;
  let traveled = 0;
  let life = 0;
  let maxLife = 0;
  let wait = rng(2, 6);

  const spawn = () => {
    let halfH =
      DISTANCE * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    let halfW = halfH * camera.aspect;
    let angle = rng(0.3, 0.7);

    head.set(
      rng(-halfW, halfW),
      rng(0, halfH),
      camera.position.z - DISTANCE
    );
    dir.set(Math.cos(angle) * (Math.random() < 0.5 ? -1 : 1), -Math.sin(angle), 0);
    speed = halfH * rng(1.5, 2.5);
    length = halfH * rng(0.2, 0.35);
    traveled = 0;
    life = 0;
    maxLife = rng(0.5, 1);
    line.visible = true;
  };

  const update = (dt: number) => {
    if (!line.visible) {
      wait -= dt;
      if (wait <= 0) spawn();
      return;
    }

    life += dt;

    if (life >= maxLife) {
      line.visible = false;
      wait = rng(2, 7);
      return;
    }

    head.addScaledVector(dir, speed * dt);
    traveled += speed * dt;

    let tail = head.clone().addScaledVector(dir, -Math.min(length, traveled));

    positions.set([head.x, head.y, head.z, tail.x, tail.y, tail.z]);
    geometry.attributes.position.needsUpdate = true;
    material.opacity = Math.sin((Math.PI * life) / maxLife);
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
  };

  return { line, update, dispose };
}

export { createShootingStar };
