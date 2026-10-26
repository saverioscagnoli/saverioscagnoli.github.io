import type React from "react";

const LinuxIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M6 0h4v1h-4zM5 1h6v1h-6zM4 2h2v1h-2zM7 2h2v1h-2zM10 2h2v1h-2zM4 3h8v1h-8zM4 4h3v1h-3zM9 4h3v1h-3zM3 5h10v1h-10zM3 6h3v1h-3zM10 6h3v1h-3zM2 7h3v1h-3zM11 7h3v1h-3zM2 8h2v1h-2zM12 8h2v1h-2zM1 9h3v1h-3zM12 9h3v1h-3zM1 10h2v1h-2zM13 10h2v1h-2zM1 11h2v1h-2zM13 11h2v1h-2zM1 12h3v1h-3zM12 12h3v1h-3zM2 13h3v1h-3zM11 13h3v1h-3zM1 14h5v1h-5zM10 14h5v1h-5zM1 15h5v1h-5zM10 15h5v1h-5z" />
    </svg>
  );
};

export { LinuxIcon };
