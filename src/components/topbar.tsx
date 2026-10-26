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
import { Link } from "react-router";

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
        <Link to="/">
          <Button leftIcon={<HomeIcon />} />
        </Link>
        <a href="https://github.com/saverioscagnoli" target="_blank">
          <Button leftIcon={<GithubIcon />}>GitHub</Button>
        </a>
        <a
          href="https://www.linkedin.com/in/saverio-scagnoli-988463227/"
          target="_blank"
        >
          <Button leftIcon={<LinkedinIcon />}>LinkedIn</Button>
        </a>
        <a
          href="https://open.spotify.com/user/ngn6rl6jsbkxp9i8opc4lduee"
          target="_blank"
        >
          <Button leftIcon={<SpotifyIcon />}>Spotify</Button>
        </a>
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
        <a href="https://github.com/saverioscagnoli/saverioscagnoli.github.io">
          <Button leftIcon={<GithubIcon />}>Source</Button>
        </a>
      </div>
    </div>
  );
};

export { Topbar };
