import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../App.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex items-center justify-between nav-bar">
        <div className="nav-links flex gap-4">
          <Link to="/" className="nav-link [&.active]:font-bold">
            Home
          </Link>
          <Link to="/signIn" className="nav-link [&.active]:font-bold">
            Sign In
          </Link>
          <Link to="/signUp" className="nav-link [&.active]:font-bold">
            Sign Up
          </Link>
        </div>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
