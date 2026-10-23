import { calculateAge, cn } from "~/lib/utils";
import { BIRTHDAY, DEBIAN, PROJECTS, TUX } from "~/lib/consts";
import { Topbar } from "~/components/topbar";
import { ProjectCard } from "~/components/project-card";

const App = () => {
  return (
    <div className={cn("min-h-screen")}>
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
          <p className={cn("atext-left whitespace-pre")}>{TUX}</p>
          <p className={cn("text-left whitespace-pre")}>{DEBIAN}</p>
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
