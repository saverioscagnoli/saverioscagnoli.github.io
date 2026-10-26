import type React from "react";

const CIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M7 0h2v1h-2zM5 1h6v1h-6zM3 2h10v1h-10zM1 3h14v1h-14zM1 4h5v1h-5zM11 4h4v1h-4zM1 5h4v1h-4zM12 5h3v1h-3zM1 6h3v1h-3zM7 6h8v1h-8zM1 7h3v1h-3zM6 7h9v1h-9zM1 8h3v1h-3zM6 8h9v1h-9zM1 9h3v1h-3zM7 9h8v1h-8zM1 10h4v1h-4zM12 10h3v1h-3zM1 11h5v1h-5zM11 11h4v1h-4zM1 12h14v1h-14zM3 13h10v1h-10zM5 14h6v1h-6zM7 15h2v1h-2z" />
    </svg>
  );
};

export { CIcon };
