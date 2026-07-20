import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Layout.css";

// This is the shared shell: Navbar on top (fixed), Sidebar on the left (fixed on desktop,
// off-canvas drawer on tablet/mobile), and whatever page matches the current route
// renders through <Outlet />.
const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
