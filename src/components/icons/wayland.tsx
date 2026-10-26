import type React from "react";

const WaylandIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M0 2h2v1h-2zM7 2h2v1h-2zM14 2h2v1h-2zM0 3h2v1h-2zM7 3h2v1h-2zM14 3h2v1h-2zM0 4h2v1h-2zM7 4h2v1h-2zM14 4h2v1h-2zM0 5h2v1h-2zM7 5h2v1h-2zM14 5h2v1h-2zM0 6h2v1h-2zM6 6h4v1h-4zM14 6h2v1h-2zM0 7h2v1h-2zM6 7h4v1h-4zM14 7h2v1h-2zM0 8h2v1h-2zM5 8h2v1h-2zM9 8h2v1h-2zM14 8h2v1h-2zM1 9h2v1h-2zM5 9h2v1h-2zM9 9h2v1h-2zM13 9h2v1h-2zM1 10h2v1h-2zM4 10h2v1h-2zM10 10h2v1h-2zM13 10h2v1h-2zM2 11h4v1h-4zM10 11h4v1h-4zM2 12h3v1h-3zM11 12h3v1h-3zM3 13h1v1h-1zM12 13h1v1h-1z" />
    </svg>
  );
};

export { WaylandIcon };
