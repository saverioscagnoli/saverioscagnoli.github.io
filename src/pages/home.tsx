import { useState } from "react";
import {
  CIcon,
  DevicesIcon,
  LinuxIcon,
  LuaIcon,
  RustIcon,
  WaylandIcon,
  WrenchIcon
} from "~/components/icons";
import { Space } from "~/components/three";
import { ProjectCard } from "~/components/ui/project-card";
import { calculateAge, cn } from "~/lib/utils";

export const TUX = `
         _nnnn_
        dGGGGMMb
       @p~qp~~qMb
       M|@||@) M|
       @,----.JM|
      JS^\\__/  qKL
     dZP        qKRb
    dZP          qKKb
   fZP            SMMb
   HZM            MMMM
   FqM            MMMM
 __| ".        |\\dS"qML
 |    \`.       | \`' \\Zq
_)      \\.___.,|     .'
\\____   )MMMMMP|   .'
     \`-'       \`--'
`;

export const DEBIAN = `
        _,met$$$$$gg.
     ,g$$$$$$$$$$$$$$$P.
   ,g$$P""       """Y$$.".
  ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.\`"Y$$$$P"'
 \`$$b      "-.__
  \`Y$$b
   \`Y$$.
     \`$$b.
       \`Y$$b.
         \`"Y$b._
             \`\`\`\`"
`;

const HomePage = () => {
  const [ready, setReady] = useState<boolean>(false);

  return (
    <div className={cn("page", "py-4", "relative")}>
      <Space
        className={cn(
          "w-full h-full",
          "fixed inset-0",
          "-z-10",
          "transition-opacity duration-1000",
          ready ? "opacity-100" : "opacity-0"
        )}
        onReady={() => setReady(true)}
      />
      <h1 className={cn("text-[57px]")}>Saverio Scagnoli</h1>
      <h2 className={cn("text-[38px]")}>
        System programmer, open source enthusiast
      </h2>
      <div data-space-avoid className={cn("flex flex-col gap-4 pt-2 px-4")}>
        <p>
          I'm a {calculateAge(new Date("2002-10-29"))}-year-old developer from
          Rome, studying computer science at La Sapienza.
        </p>
        <p>
          I'm happiest writing system software and building development and
          utility tools, mostly in Go and Rust. On the frontend, I use React and
          TypeScript. Honestly, I'm just happy when I'm programming, any kind of
          software.
        </p>
        <p>
          Apart from the nerd stuff, I enjoy other nerd stuff: movies, comics
          and photography.
        </p>
        <p>Jazz is the only way!</p>
      </div>
      <div className={cn("flex justify-center gap-8 pt-2 px-4 mt-8")}>
        <p className={cn("text-left whitespace-pre leading-none")}>{TUX}</p>
        <p
          className={cn(
            "text-left whitespace-pre leading-none",
            "text-[#d70a53]"
          )}
        >
          {DEBIAN}
        </p>
      </div>
      <div className={cn("flex flex-col justify-center gap-4", "pt-4")}>
        <h1 className={cn("text-[38px]")}>Projects</h1>
        <ProjectCard
          title="Karna"
          desc="Cross-platform game framework with optional scripting in Lua / JS. Based on SDL3, no-std."
          url="https://github.com/saverioscagnoli/karna"
          tags={[
            { text: "Rust", icon: <RustIcon /> },
            { text: "C", icon: <CIcon /> },
            { text: "Lua", icon: <LuaIcon /> },
            { text: "Cross-Platform", icon: <DevicesIcon /> }
          ]}
        />
        <ProjectCard
          title="wwwidgets"
          desc="Widget framework for Wayland compositors. Built with webkit. Desktop widgets with web tech!"
          url="https://github.com/saverioscagnoli/wwwidgets"
          tags={[
            { text: "C", icon: <CIcon /> },
            { text: "Linux", icon: <LinuxIcon /> },
            { text: "Wayland", icon: <WaylandIcon /> }
          ]}
        />
        <ProjectCard
          title="pls"
          desc="Modern and customizable listing tool + various filesystem utils."
          url="https://github.com/saverioscagnoli/pls"
          tags={[
            { text: "Rust", icon: <RustIcon /> },
            { text: "Tools", icon: <WrenchIcon /> },
            { text: "Cross-Platform", icon: <DevicesIcon /> }
          ]}
        />
        <ProjectCard
          title="wbg"
          desc="Simple and lightweight wallpaper daemon for Waylnad. With animated wallpapers support."
          url="https://github.com/saverioscagnoli/wbg"
          tags={[
            { text: "Rust", icon: <RustIcon /> },
            { text: "Tools", icon: <WrenchIcon /> },
            { text: "Linux", icon: <LinuxIcon /> },
            { text: "Wayland", icon: <WaylandIcon /> }
          ]}
        />
        <ProjectCard
          title="traccia"
          desc="Customizable and flexible logging solution for Rust. (no-std too!)"
          url="https://github.com/saverioscagnoli/traccia"
          tags={[
            { text: "Rust", icon: <RustIcon /> },
            { text: "Tools", icon: <WrenchIcon /> },
            { text: "Cross-Platform", icon: <DevicesIcon /> }
          ]}
        />
        <ProjectCard
          title="figura"
          desc="Fast and small templating engine for Rust."
          url="https://github.com/saverioscagnoli/figura"
          tags={[
            { text: "Rust", icon: <RustIcon /> },
            { text: "Tools", icon: <WrenchIcon /> },
            { text: "Cross-Platform", icon: <DevicesIcon /> }
          ]}
        />
      </div>
    </div>
  );
};

export { HomePage };
