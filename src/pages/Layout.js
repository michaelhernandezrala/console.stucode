import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";

function Layout() {
  const location = useLocation();

  const excludedRoutes = ["/login", "/register"];

  return (
    <main>
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
    </main>
  );
}

export default Layout;
