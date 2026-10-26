import type React from "react";
import { cn } from "~/lib/utils";

type TagProps = {
  text: string;
  icon?: React.ReactNode;
} & React.ComponentProps<"span">;

const Tag: React.FC<TagProps> = ({ text, icon, className, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "px-2 py-0.5",
        "bg-black text-white",
        "border border-white",
        className
      )}
      {...props}
    >
      {icon && icon}
      {text}
    </span>
  );
};

export { Tag };
export type { TagProps };
