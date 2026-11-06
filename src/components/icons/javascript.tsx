import type React from "react";

const JavascriptIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M0 0h16v9h-16zM0 9h9v1h-9zM10 9h1v1h-1zM14 9h2v1h-2zM0 10h9v1h-9zM10 10h1v1h-1zM12 10h4v1h-4zM0 11h9v1h-9zM10 11h1v1h-1zM14 11h2v1h-2zM0 12h7v1h-7zM8 12h1v1h-1zM10 12h3v1h-3zM14 12h2v1h-2zM0 13h7v1h-7zM10 13h1v1h-1zM14 13h2v1h-2zM0 14h16v2h-16z" />
    </svg>
  );
};

export { JavascriptIcon };
