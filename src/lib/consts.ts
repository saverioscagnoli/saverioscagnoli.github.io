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
    name: "Karna",
    description:
      "Game framework inspired by love2d, made in rust, with js and lua scripting.",
    url: "https://github.com/saverioscagnoli/karna"
  },
  {
    name: "WWWidgets",
    description:
      "A widget framework for Wayland compositors, built with webkit2gtk.",
    url: "https://github.com/saverioscagnoli/wwwidgets"
  },
  {
    name: "wbg",
    description: "Simple and lightweight wallpaper daemon for Wayland.",
    url: "https://github.com/saverioscagnoli/wbg"
  },
  {
    name: "pls",
    description: "Modern and customizable folder listng tool.",
    url: "https://github.com/saverioscagnoli/pls"
  },
  {
    name: "traccia",
    description: "Customizable and flexible logging solution for Rust.",
    url: "https://github.com/saverioscagnoli/traccia"
  },
  {
    name: "figura",
    description: "Fast and small templating engine for Rust.",
    url: "https://github.com/saverioscagnoli/figura"
  }
];
