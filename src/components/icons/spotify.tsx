import type React from "react";

const SpotifyIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M5 0h6v1h-6zM3 1h10v1h-10zM2 2h12v1h-12zM1 3h14v1h-14zM1 4h4v1h-4zM11 4h4v1h-4zM0 5h3v1h-3zM5 5h6v1h-6zM13 5h3v1h-3zM0 6h16v1h-16zM0 7h5v1h-5zM11 7h5v1h-5zM0 8h4v1h-4zM5 8h6v1h-6zM12 8h4v1h-4zM0 9h16v1h-16zM0 10h6v1h-6zM10 10h6v1h-6zM1 11h4v1h-4zM6 11h4v1h-4zM11 11h4v1h-4zM1 12h14v1h-14zM2 13h12v1h-12zM3 14h10v1h-10zM5 15h6v1h-6z" />
    </svg>
  );
};

export { SpotifyIcon };
