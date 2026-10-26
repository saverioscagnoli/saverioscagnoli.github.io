import * as THREE from "three";

type SpriteOptions = {
  still?: boolean;
  onFrame?: () => void;
};

async function createSprite(
  path: string,
  { still, onFrame }: SpriteOptions = {}
): Promise<THREE.Mesh> {
  return new Promise((res, rej) => {
    let video = document.createElement("video");
    video.src = `${import.meta.env.BASE_URL}${path}`;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.play();

    let videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    if (still) {
      video.requestVideoFrameCallback(() => {
        video.pause();
        onFrame?.();
      });
    }

    let mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: videoTexture,
        transparent: true,
        depthWrite: false
      })
    );

    video.addEventListener("loadedmetadata", () => {
      mesh.scale.x = mesh.scale.y * (video.videoWidth / video.videoHeight);
      res(mesh);
    });

    video.onerror = err => rej(err);
  });
}

export { createSprite };
