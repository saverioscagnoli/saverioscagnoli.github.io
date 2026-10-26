import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  FolderIcon,
  GithubIcon,
  HomeIcon,
  LinkedinIcon,
  SpotifyIcon,
  WrenchIcon
} from "~/components/icons";
import { Fireworks } from "~/components/ascii/fireworks";

const Topbar = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "w-full h-16",
        "sticky top-0 z-10",
        "flex justify-between",
        "px-16",
        "bg-black",
        "border-b border-b-[#363636]"
      )}
    >
      <Fireworks
        active={hovered}
        className={cn("w-full h-full", "absolute", "-z-10")}
      />
      <div className={cn("h-full", "flex gap-4 items-center")}>
        <Button leftIcon={<HomeIcon />} />
        <Button leftIcon={<GithubIcon />}>GitHub</Button>
        <Button leftIcon={<LinkedinIcon />}>LinkedIn</Button>
        <Button leftIcon={<SpotifyIcon />}>Spotify</Button>
      </div>
      <div className={cn("h-full", "flex gap-4 items-center")}>
        <Button leftIcon={<WrenchIcon />}>Tools</Button>
        <Button
          leftIcon={<FolderIcon />}
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({
              behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth"
            })
          }
        >
          Projects
        </Button>
        <Button leftIcon={<GithubIcon />}>Source</Button>
      </div>
    </div>
  );
};

export { Topbar };
