import { cn } from "~/lib/utils";
import { Topbar } from "~/components/topbar";
import { HomePage } from "~/pages/home";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div className={cn("w-full min-h-dvh", "bg-black")}>
      <Topbar />
      <div className={cn("w-full")}>
        <Routes>
          <Route index path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
};

export { App };
