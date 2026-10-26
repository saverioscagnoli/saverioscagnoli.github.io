import type React from "react";

const ArrowRightIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M8 2h2v1h-2zM9 3h2v1h-2zM10 4h2v1h-2zM11 5h2v1h-2zM12 6h2v1h-2zM1 7h14v1h-14zM1 8h14v1h-14zM12 9h2v1h-2zM11 10h2v1h-2zM10 11h2v1h-2zM9 12h2v1h-2zM8 13h2v1h-2z" />
    </svg>
  );
};

export { ArrowRightIcon };
