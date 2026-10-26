import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { pick, rng, rngInt } from "~/lib/utils";

const COLORS = ["#6e6a65", "#8a8178", "#5b5550", "#9a9187"];

function createAsteroid(): THREE.Mesh<
  THREE.BufferGeometry,
  THREE.MeshStandardMaterial
> {
  let base = new THREE.IcosahedronGeometry(1, 1);
  base.deleteAttribute("normal");
  base.deleteAttribute("uv");

  let geometry = mergeVertices(base);
  base.dispose();

  let position = geometry.getAttribute("position");
  let v = new THREE.Vector3();

  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i).multiplyScalar(rng(0.7, 1.15));
    position.setXYZ(i, v.x, v.y, v.z);
  }

  geometry.scale(1, rng(0.6, 1), rng(0.7, 1));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  let s = 0.5 / geometry.boundingSphere!.radius;
  geometry.scale(s, s, s);

  return new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: pick(COLORS),
      roughness: 1,
      flatShading: true
    })
  );
}

function createAsteroidCluster() {
  let group = new THREE.Group();
  let asteroids: {
    mesh: ReturnType<typeof createAsteroid>;
    spin: THREE.Vector3;
  }[] = [];

  for (let i = 0, count = rngInt(5, 10); i < count; i++) {
    let size = rng(0.1, 0.25);
    let spot = new THREE.Vector3();

    for (let k = 0; k < 20; k++) {
      spot
        .randomDirection()
        .multiplyScalar((0.5 - size / 2) * Math.random() ** 0.7);

      let clear = asteroids.every(
        ({ mesh }) =>
          mesh.position.distanceTo(spot) > (mesh.scale.x + size) / 2
      );

      if (clear) break;
    }

    let mesh = createAsteroid();
    mesh.position.copy(spot);
    mesh.scale.setScalar(size);
    group.add(mesh);

    asteroids.push({
      mesh,
      spin: new THREE.Vector3(rng(-0.6, 0.6), rng(-0.6, 0.6), 0)
    });
  }

  return { group, asteroids };
}

export { createAsteroid, createAsteroidCluster };
