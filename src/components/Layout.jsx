import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

function Layout() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-slate-100">
      <Sidebar openBar={isOpen} setOpenBar={() => setIsOpen(prev => !prev)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar openBar={isOpen} setOpenBar={() => setIsOpen(prev => !prev)} />

        <main className="flex-1 min-w-0 md:overflow-y-auto p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;