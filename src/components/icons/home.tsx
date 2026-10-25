import type React from "react";

const HomeIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M7 1h2v1h-2zM6 2h4v1h-4zM12 2h2v1h-2zM5 3h6v1h-6zM12 3h2v1h-2zM4 4h10v1h-10zM3 5h11v1h-11zM2 6h12v1h-12zM1 7h14v1h-14zM0 8h16v1h-16zM2 9h12v1h-12zM2 10h4v5h-4zM10 10h4v5h-4z" />
    </svg>
  );
};

export { HomeIcon };
