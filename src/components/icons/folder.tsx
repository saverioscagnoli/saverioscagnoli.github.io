import type React from "react";

const FolderIcon: React.FC<React.ComponentProps<"svg">> = props => {
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
      <path d="M1 2h5v1h-5zM0 3h15v1h-15zM0 4h15v1h-15zM0 5h1v1h-1zM0 6h16v1h-16zM0 7h16v1h-16zM0 8h16v1h-16zM0 9h16v1h-16zM0 10h16v1h-16zM0 11h16v1h-16zM0 12h16v1h-16zM1 13h14v1h-14z" />
    </svg>
  );
};

export { FolderIcon };
