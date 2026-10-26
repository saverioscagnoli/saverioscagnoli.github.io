import type React from "react";

const LuaIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M13 0h2v1h-2zM12 1h4v1h-4zM12 2h4v1h-4zM4 3h5v1h-5zM13 3h2v1h-2zM2 4h9v1h-9zM1 5h7v1h-7zM9 5h3v1h-3zM1 6h6v1h-6zM10 6h2v1h-2zM0 7h6v1h-6zM11 7h2v1h-2zM0 8h7v1h-7zM10 8h3v1h-3zM0 9h8v1h-8zM9 9h4v1h-4zM0 10h13v1h-13zM0 11h13v1h-13zM1 12h11v1h-11zM1 13h11v1h-11zM2 14h9v1h-9zM4 15h5v1h-5z" />
    </svg>
  );
};

export { LuaIcon };
