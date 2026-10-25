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

const Topbar = () => {
  return (
    <div
      className={cn(
        "w-full h-16",
        "sticky top-0 z-10",
        "flex justify-between",
        "px-16",
        "bg-black",
        "border-b border-b-[#363636]"
      )}
    >
      <div className={cn("h-full", "flex gap-4 items-center")}>
        <Button leftIcon={<HomeIcon />} />
        <Button leftIcon={<GithubIcon />}>GitHub</Button>
        <Button leftIcon={<LinkedinIcon />}>LinkeIn</Button>
        <Button leftIcon={<SpotifyIcon />}>Spotify</Button>
      </div>
      <div className={cn("h-full", "flex gap-4 items-center")}>
        <Button leftIcon={<WrenchIcon />}>Tools</Button>
        <Button leftIcon={<FolderIcon />}>Projects</Button>
        <Button leftIcon={<GithubIcon />}>Source</Button>
      </div>
    </div>
  );
};

export { Topbar };
