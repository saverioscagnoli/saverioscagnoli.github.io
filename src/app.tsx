import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { calculateAge, cn } from "~/lib/utils";
import { BIRTHDAY, DEBIAN, PROJECTS, TUX } from "~/lib/consts";
import { Topbar } from "~/components/topbar";
import { ProjectCard } from "~/components/project-card";
import { Stars } from "~/components/space/stars";
import { CrtEffect } from "~/components/crt-effect";
import { Space } from "~/components/space";
import { hideLoader, settled } from "~/lib/loading";

const LOADER_TIMEOUT = 8000;

const App = () => {
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    if (!canvasReady) {
      return;
    }

    const timeout = setTimeout(hideLoader, LOADER_TIMEOUT);

    Promise.all([document.fonts.ready, settled()]).then(() => {
      clearTimeout(timeout);
      hideLoader();
    });

    return () => clearTimeout(timeout);
  }, [canvasReady]);

  return (
    <div className={cn("min-h-screen")}>
      <div className={cn("fixed inset-0 -z-10")}>
        <Canvas
          camera={{ position: [0, 0, 0], far: 3000 }}
          dpr={1}
          onCreated={() => setCanvasReady(true)}
        >
          <Stars speed={0.003} minSize={1} maxSize={2} />
          <Space />
          <CrtEffect pixelSize={3} />
        </Canvas>
      </div>
      <div className={cn("fixed inset-0 -z-10", "backdrop-blur-[4px]")} />
      <Topbar className={cn("sticky top-0 z-10", "bg-black")} />
      <div className={cn("page")}>
        <h1 className={cn("text-[48px]")}>Saverio Scagnoli</h1>
        <h2 className={cn("text-[32px]")}>
          System programmer, open source enthusiast
        </h2>
        <div className={cn("flex flex-col gap-4 pt-2 px-4")}>
          <p>
            I'm a {calculateAge(BIRTHDAY)}-year-old developer from Rome,
            studying computer science at La Sapienza.
          </p>
          <p>
            I'm happiest writing system software and building development and
            utility tools, mostly in Go and Rust. On the frontend, I use React
            and TypeScript. Honestly, I'm just happy when I'm programming, any
            kind of software.
          </p>
          <p>
            Apart from the nerd stuff, I enjoy other nerd stuff: movies, comics
            and photography.
          </p>
          <p>Jazz is the only way!</p>
        </div>
        <div className={cn("flex justify-center gap-8 pt-2 px-4 mt-8")}>
          <p className={cn("text-left whitespace-pre font-[Iosevka_Term]")}>
            {TUX}
          </p>
          <p
            className={cn(
              "text-left whitespace-pre font-[Iosevka_Term]",
              "text-[#d70a53]"
            )}
          >
            {DEBIAN}
          </p>
        </div>
        <h2
          id="projects"
          className={cn("text-[32px]", "mt-8 px-4", "scroll-mt-16")}
        >
          Projects
        </h2>
        <div className={cn("flex flex-col gap-4 pt-2 px-4 pb-16")}>
          {PROJECTS.map(project => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { App };
