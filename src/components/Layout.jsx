import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Left side menu */}
      <Sidebar />

      {/* Right side content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* Top bar */}
        <Navbar />

        {/* Page content changes here */}
        <div style={{ padding: "20px", overflowY: "auto" }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Layout;