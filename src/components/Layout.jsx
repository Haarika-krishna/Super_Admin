import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Layout.css";

// This is the shared shell: Navbar on top (fixed), Sidebar on the left (fixed),
// and whatever page matches the current route renders through <Outlet />.
const Layout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <Sidebar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
