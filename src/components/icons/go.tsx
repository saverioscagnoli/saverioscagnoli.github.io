import type React from "react";

const GoIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M1 1h2v1h-2zM5 1h6v1h-6zM13 1h2v1h-2zM1 2h14v1h-14zM2 3h12v1h-12zM1 4h2v1h-2zM6 4h4v1h-4zM13 4h2v1h-2zM1 5h1v1h-1zM7 5h2v1h-2zM14 5h1v1h-1zM1 6h1v1h-1zM4 6h2v1h-2zM7 6h2v1h-2zM10 6h2v1h-2zM14 6h1v1h-1zM1 7h1v1h-1zM4 7h2v1h-2zM7 7h2v1h-2zM10 7h2v1h-2zM14 7h1v1h-1zM1 8h2v1h-2zM6 8h4v1h-4zM13 8h2v1h-2zM1 9h5v1h-5zM10 9h5v1h-5zM1 10h6v1h-6zM9 10h6v1h-6zM1 11h14v1h-14zM1 12h6v1h-6zM9 12h6v1h-6zM2 13h5v1h-5zM9 13h5v1h-5zM3 14h10v1h-10z" />
    </svg>
  );
};

export { GoIcon };
