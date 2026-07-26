import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Users", path: "/users" },
  { label: "Departments", path: "/departments" },
  { label: "Courses", path: "/courses" },
  { label: "Timetable", path: "/timetable" },
  { label: "Notifications", path: "/notifications" },
  { label: "Announcements", path: "/announcements" },
];

function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#111", color: "white", padding: "20px" }}>
      <h2>LECTRA</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {navItems.map((item) => (
          <li key={item.path} style={{ margin: "8px 0" }}>
            <NavLink
              to={item.path}
              style={({ isActive }) => ({
                color: isActive ? "#3b82f6" : "white",
                textDecoration: "none",
              })}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;