import type React from "react";
import { cn } from "~/lib/utils";

type ButtonProps = {
  leftIcon?: React.ReactNode;
} & React.ComponentProps<"button">;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  leftIcon,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2",
        "h-10 px-2",
        !children && "aspect-square px-0",
        "bg-black text-white",
        "border border-white",
        "hover:bg-white hover:text-black"
      )}
      {...props}
    >
      {leftIcon && leftIcon}
      {children}
    </button>
  );
};

export { Button };
