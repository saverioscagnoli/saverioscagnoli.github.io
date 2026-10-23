import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  CanvasTexture,
  LinearFilter,
  NearestFilter,
  SRGBColorSpace
} from "three";
import { track } from "~/lib/loading";

type Frame = {
  image: ImageBitmap;
  duration: number;
};

async function decodeGif(url: string, signal: AbortSignal): Promise<Frame[]> {
  let response = await fetch(url, { signal });
  let decoder = new ImageDecoder({
    data: await response.arrayBuffer(),
    type: "image/gif"
  });

  await decoder.tracks.ready;

  let count = decoder.tracks.selectedTrack?.frameCount ?? 1;
  let frames: Frame[] = [];

  for (let i = 0; i < count; i++) {
    let { image } = await decoder.decode({ frameIndex: i });

    frames.push({
      image: await createImageBitmap(image),
      duration: (image.duration ?? 100_000) / 1000
    });

    image.close();
  }

  decoder.close();

  return frames;
}

async function decodeStatic(
  url: string,
  signal: AbortSignal
): Promise<Frame[]> {
  let response = await fetch(url, { signal });
  let image = await createImageBitmap(await response.blob());

  return [{ image, duration: Infinity }];
}

export function useSpriteTexture(url: string): CanvasTexture | null {
  const [texture, setTexture] = useState<CanvasTexture | null>(null);
  const frames = useRef<Frame[]>([]);
  const current = useRef(-1);
  const offset = useMemo(() => Math.random() * 10_000, []);

  useEffect(() => {
    let controller = new AbortController();
    let animated = url.endsWith(".gif") && "ImageDecoder" in window;
    let created: CanvasTexture | null = null;

    track((animated ? decodeGif : decodeStatic)(url, controller.signal))
      .then(result => {
        if (controller.signal.aborted) {
          result.forEach(frame => frame.image.close());
          return;
        }

        let canvas = document.createElement("canvas");
        canvas.width = result[0].image.width;
        canvas.height = result[0].image.height;
        canvas.getContext("2d")?.drawImage(result[0].image, 0, 0);

        created = new CanvasTexture(canvas);
        created.colorSpace = SRGBColorSpace;
        created.magFilter = NearestFilter;
        created.minFilter = LinearFilter;
        created.generateMipmaps = false;

        frames.current = result;
        current.current = 0;
        setTexture(created);
      })
      .catch(() => {});

    return () => {
      controller.abort();
      frames.current.forEach(frame => frame.image.close());
      frames.current = [];
      created?.dispose();
      setTexture(null);
    };
  }, [url]);

  useFrame(({ clock }) => {
    let list = frames.current;

    if (!texture || list.length < 2) {
      return;
    }

    let total = list.reduce((sum, frame) => sum + frame.duration, 0);
    let t = (clock.elapsedTime * 1000 + offset) % total;
    let index = 0;

    while (index < list.length - 1 && t >= list[index].duration) {
      t -= list[index].duration;
      index++;
    }

    if (index === current.current) {
      return;
    }

    current.current = index;

    let canvas = texture.image as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");

    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    ctx?.drawImage(list[index].image, 0, 0);
    texture.needsUpdate = true;
  });

  return texture;
}
