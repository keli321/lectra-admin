import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBookOpen,
  faBullhorn,
  faBuilding,
  faCalendarDays,
  faChartPie,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: faChartPie },
  { label: "Users", path: "/users", icon: faUsers },
  { label: "Departments", path: "/departments", icon: faBuilding },
  { label: "Courses", path: "/courses", icon: faBookOpen },
  { label: "Timetable", path: "/timetable", icon: faCalendarDays },
  { label: "Notifications", path: "/notifications", icon: faBell },
  { label: "Announcements", path: "/announcements", icon: faBullhorn },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-950 px-4 py-6 text-white">
      <div className="mb-10 flex items-center gap-3 px-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-lg font-black text-slate-950">
          L
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-wide">LECTRA</h1>
          <p className="text-xs text-slate-400">Admin workspace</p>
        </div>
      </div>

      <p className="mb-3 px-3 text-xs font-bold tracking-[0.16em] text-slate-500">
        MAIN MENU
      </p>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-xs text-slate-400">LECTRA Admin Portal</p>
        <p className="mt-1 text-sm font-semibold text-teal-300">
          Academic management made simple
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;