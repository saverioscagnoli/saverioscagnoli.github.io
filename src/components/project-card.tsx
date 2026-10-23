import type React from "react";
import type { Project } from "~/lib/consts";
import { cn } from "~/lib/utils";

type ProjectCardProps = React.ComponentProps<"a"> & {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className,
  ...props
}) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group flex flex-col gap-2 p-4",
        "border border-white",
        "hover:bg-white hover:text-black",
        className
      )}
      {...props}
    >
      <h3 className={cn("text-[32px]")}>
        {project.name}
        <span className={cn("invisible group-hover:visible")}> -&gt;</span>
      </h3>
      <p>{project.description}</p>
    </a>
  );
};

export { ProjectCard };
