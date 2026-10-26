import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const FRAMES = [
  "[=   ]",
  "[==  ]",
  "[ == ]",
  "[  ==]",
  "[   =]",
  "[  ==]",
  "[ == ]",
  "[==  ]"
];

type LoaderProps = {
  visible: boolean;
} & React.ComponentProps<"div">;

const Loader: React.FC<LoaderProps> = ({ visible, className, ...props }) => {
  const [frame, setFrame] = useState<number>(0);

  useEffect(() => {
    if (!visible) return;

    let id = setInterval(() => setFrame(f => (f + 1) % FRAMES.length), 100);

    return () => clearInterval(id);
  }, [visible]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        "flex flex-col items-center justify-center gap-2",
        "bg-black text-white text-[19px]",
        "transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      aria-hidden={!visible}
      {...props}
    >
      <p className={cn("whitespace-pre")}>{FRAMES[frame]}</p>
      <p>loading...</p>
    </div>
  );
};

export { Loader };
