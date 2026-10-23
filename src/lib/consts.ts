export const BIRTHDAY = new Date("2002-10-29");
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

export type Project = {
  name: string;
  description: string;
  url: string;
};

export const PROJECTS: Project[] = [
  {
    name: "WWWidgets",
    description:
      "A widget framework for Wayland compositors, built with webview2gtk. All the power of the web on the desktop!",
    url: "https://github.com/saverioscagnoli/wwwidgets"
  },
  {
    name: "pls",
    description:
      "A modern, highly customizable version of ls, plus various file system utilities.",
    url: "https://github.com/saverioscagnoli/pls"
  },
  {
    name: "Karna",
    description: "A 2D (and hopefully soon 3D) game engine based on wgpu.",
    url: "https://github.com/saverioscagnoli/karna"
  }
];
