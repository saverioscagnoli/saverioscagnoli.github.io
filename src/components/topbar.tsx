import type React from "react";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import { GithubIcon } from "./github-icon";

const Topbar: React.FC<React.ComponentProps<"div">> = props => {
  return (
    <div
      {...props}
      className={cn(
        "w-full h-12 px-16",
        "flex items-center justify-end",
        "border-b border-b-[#313131]",
        props.className
      )}
    >
      <div className={cn("flex gap-4")}>
        <a href="#projects">
          <Button>Projects</Button>
        </a>
        <a
          href="https://github.com/saverioscagnoli/svscagn.com"
          target="_blank"
        >
          <Button className={cn("flex items-center gap-2")}>
            <GithubIcon />
            Source
          </Button>
        </a>
      </div>
    </div>
  );
};

export { Topbar };
