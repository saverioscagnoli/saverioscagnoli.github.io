import type React from "react";

const DevicesIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M0 1h12v1h-12zM0 2h1v1h-1zM11 2h1v1h-1zM0 3h1v1h-1zM11 3h1v1h-1zM0 4h1v1h-1zM0 5h1v1h-1zM10 5h6v1h-6zM0 6h1v1h-1zM10 6h1v1h-1zM15 6h1v1h-1zM0 7h1v1h-1zM10 7h1v1h-1zM15 7h1v1h-1zM0 8h9v1h-9zM10 8h1v1h-1zM15 8h1v1h-1zM0 9h9v1h-9zM10 9h1v1h-1zM15 9h1v1h-1zM5 10h2v1h-2zM10 10h1v1h-1zM15 10h1v1h-1zM3 11h6v1h-6zM10 11h1v1h-1zM15 11h1v1h-1zM10 12h1v1h-1zM15 12h1v1h-1zM10 13h1v1h-1zM12 13h2v1h-2zM15 13h1v1h-1zM10 14h6v1h-6z" />
    </svg>
  );
};

export { DevicesIcon };
