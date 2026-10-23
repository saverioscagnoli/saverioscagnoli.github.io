import type React from "react";

const WrenchIcon: React.FC<React.ComponentProps<"svg">> = props => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      {...props}
    >
      <path d="M11 1h2v1h-2zM10 2h3v1h-3zM9 3h3v1h-3zM14 3h1v1h-1zM9 4h2v1h-2zM13 4h3v1h-3zM9 5h7v1h-7zM8 6h7v1h-7zM7 7h6v1h-6zM6 8h3v1h-3zM5 9h3v1h-3zM4 10h3v1h-3zM3 11h3v1h-3zM2 12h3v1h-3zM1 13h3v1h-3zM1 14h2v1h-2z" />
    </svg>
  );
};

export { WrenchIcon };
