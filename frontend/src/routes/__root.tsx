import NavBar from "@/components/NavBar";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const Root = () => {
  return (
    <div className="container mx-auto">
      <NavBar />
      <Outlet />
    </div>
  );
};

export const Route = createRootRoute({
  component: Root,
});
