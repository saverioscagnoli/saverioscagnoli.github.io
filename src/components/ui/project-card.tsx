import type React from "react";
import { cn } from "~/lib/utils";
import { Tag, type TagProps } from "./tag";
import { useState } from "react";
import { ArrowRightIcon } from "../icons";

type ProjectCardProps = {
  title: string;
  desc: string;
  url: string;
  tags: TagProps[];
} & React.ComponentProps<"div">;

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  desc,
  url,
  tags,
  className,
  ...props
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <a href={url} target="_blank">
      <div
        className={cn(
          "w-full h-30",
          "flex flex-col gap-2",
          "px-4 py-2",
          "text-white",
          "border border-white",
          "cursor-pointer",
          "hover:bg-white hover:text-black",
          "backdrop-blur-lg",
          className
        )}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
      >
        <div className={cn("flex items-center gap-4")}>
          <h1 className={cn("text-[38px]")}>{title}</h1>
          {tags.map(t => (
            <Tag key={t.text} {...t} />
          ))}
          <ArrowRightIcon
            width={24}
            height={24}
            className={cn("text-xl", hovered ? "visible" : "hidden")}
          />
        </div>
        <p>{desc}</p>
      </div>
    </a>
  );
};

export { ProjectCard };
