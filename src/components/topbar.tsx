import type React from "react";
import { useState } from "react";
import { cn, pick } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { GithubIcon } from "~/components/icons/github";
import { WrenchIcon } from "~/components/icons/wrench";
import { FolderIcon } from "~/components/icons/folder";
import { LinkedinIcon } from "~/components/icons/linkedin";
import { SpotifyIcon } from "~/components/icons/spotify";
import { BouncingBalls } from "~/components/ascii-art/bouncing-balls";
import { Fireworks } from "~/components/ascii-art/fireworks";
import { Plasma } from "~/components/ascii-art/plasma";
import { Fire } from "~/components/ascii-art/fire";
import { RadioWaves } from "~/components/ascii-art/radio-waves";
import { Starfield } from "~/components/ascii-art/starfield";

const ANIMATIONS = [
  Plasma,
  Fireworks,
  Fire,
  RadioWaves,
  Starfield,
  BouncingBalls
];

const Topbar: React.FC<React.ComponentProps<"div">> = props => {
  const [Animation] = useState(() => pick(ANIMATIONS));

  return (
    <div
      {...props}
      className={cn(
        "relative w-full h-16 px-16",
        "flex items-center justify-between",
        "border-b border-b-[#313131]",
        props.className
      )}
    >
      <Animation
        className={cn("absolute inset-0 w-full h-full", "pointer-events-none")}
      />
      <div className={cn("relative flex gap-4")}>
        <a href="https://github.com/saverioscagnoli" target="_blank">
          <Button className={cn("flex items-center gap-2", "bg-black")}>
            <GithubIcon />
            GitHub
          </Button>
        </a>
        <a
          href="https://www.linkedin.com/in/saverio-scagnoli-988463227/"
          target="_blank"
        >
          <Button className={cn("flex items-center gap-2", "bg-black")}>
            <LinkedinIcon />
            LinkedIn
          </Button>
        </a>
        <a
          href="https://open.spotify.com/user/ngn6rl6jsbkxp9i8opc4lduee"
          target="_blank"
        >
          <Button className={cn("flex items-center gap-2", "bg-black")}>
            <SpotifyIcon />
            Spotify
          </Button>
        </a>
      </div>
      <div className={cn("relative flex gap-4")}>
        <Button className={cn("flex items-center gap-2", "bg-black")}>
          <WrenchIcon />
          Tools
        </Button>
        <a href="#projects">
          <Button className={cn("flex items-center gap-2", "bg-black")}>
            <FolderIcon />
            Projects
          </Button>
        </a>
        <a
          href="https://github.com/saverioscagnoli/svscagn.com"
          target="_blank"
        >
          <Button className={cn("flex items-center gap-2", "bg-black")}>
            <GithubIcon />
            Source
          </Button>
        </a>
      </div>
    </div>
  );
};

export { Topbar };
