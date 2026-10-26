import { useEffect, useRef } from "react";
import * as THREE from "three";

type ThreeContext = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
};

type SetupReturn = {
  update?: (dt: number, elapsed: number) => void;
  resize?: () => void;
  dispose?: () => void;
} | void;

type Setup = (ctx: ThreeContext) => SetupReturn | Promise<SetupReturn>;

function useThree(setup: Setup, pixelSize?: number, onReady?: () => void) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setupRef = useRef(setup);
  const onReadyRef = useRef(onReady);
  setupRef.current = setup;
  onReadyRef.current = onReady;

  useEffect(() => {
    let canvas = canvasRef.current;
    if (!canvas) return;

    let renderer = new THREE.WebGLRenderer({ canvas, antialias: !pixelSize });

    renderer.setPixelRatio(pixelSize ? 1 / pixelSize : window.devicePixelRatio);

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    camera.position.z = 3;

    let result: Exclude<SetupReturn, void> = {};
    let disposed = false;

    Promise.resolve(setupRef.current({ renderer, scene, camera }))
      .then(r => {
        let next = r || {};

        if (disposed) {
          next.dispose?.();
          return;
        }

        result = next;
        result.resize?.();
      })
      .catch(console.error)
      .then(() => {
        if (!disposed) onReadyRef.current?.();
      });

    const resize = () => {
      let w = canvas.clientWidth;
      let h = canvas.clientHeight;

      if (w === 0 || h === 0) return;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      result.resize?.();
    };

    let observer = new ResizeObserver(resize);

    observer.observe(canvas);
    resize();

    let clock = new THREE.Timer();

    renderer.setAnimationLoop(time => {
      clock.update(time);
      let dt = clock.getDelta();
      result.update?.(dt, clock.getElapsed());
      renderer.render(scene, camera);
    });

    return () => {
      disposed = true;
      renderer.setAnimationLoop(null);
      observer.disconnect();
      result.dispose?.();
      renderer.dispose();
    };
  }, [pixelSize]);

  return canvasRef;
}

export { useThree };
