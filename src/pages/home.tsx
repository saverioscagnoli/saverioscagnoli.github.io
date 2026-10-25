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
  return (
    <div className={cn("page", "pt-4")}>
      <h1 className={cn("text-[57px]")}>Saverio Scagnoli</h1>
      <h2 className={cn("text-[38px]")}>
        System programmer, open source enthusiast
      </h2>
      <div className={cn("flex flex-col gap-4 pt-2 px-4")}>
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
    </div>
  );
};

export { HomePage };
