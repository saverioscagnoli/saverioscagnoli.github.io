import type React from "react";
import { cn } from "~/lib/utils";

const Button: React.FC<React.ComponentProps<"button">> = props => {
  return (
    <button
      {...props}
      className={cn(
        "px-2 py-1",
        "border border-white text-white",
        "hover:bg-white hover:text-black",
        props.className
      )}
    />
  );
};

export { Button };
