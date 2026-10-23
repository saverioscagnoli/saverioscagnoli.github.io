import type React from "react";

const GithubIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M5 0h6v1h-6zM3 1h10v1h-10zM2 2h12v1h-12zM1 3h3v1h-3zM5 3h6v1h-6zM12 3h3v1h-3zM1 4h3v1h-3zM6 4h4v1h-4zM12 4h3v1h-3zM0 5h4v1h-4zM12 5h4v1h-4zM0 6h3v1h-3zM13 6h3v1h-3zM0 7h3v1h-3zM13 7h3v1h-3zM0 8h3v1h-3zM13 8h3v1h-3zM0 9h4v1h-4zM12 9h4v1h-4zM0 10h6v1h-6zM10 10h6v1h-6zM1 11h2v1h-2zM5 11h1v1h-1zM10 11h5v1h-5zM1 12h3v1h-3zM10 12h5v1h-5zM2 13h4v1h-4zM10 13h4v1h-4zM3 14h3v1h-3zM10 14h3v1h-3zM5 15h1v1h-1zM10 15h1v1h-1z" />
    </svg>
  );
};

export { GithubIcon };
