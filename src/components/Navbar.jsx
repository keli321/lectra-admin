import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Navbar({ openBar, setOpenBar }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const displayName = user?.name || user?.email || "Admin";
  const initial = displayName.charAt(0).toUpperCase();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <div className="flex gap-8">
        <button className=" cursor-pointer text-xl lg:hidden"
        onClick={setOpenBar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div>
          <p className="text-sm font-medium text-slate-500">
            Welcome back,
          </p>
          <h2 className="text-xl font-bold text-slate-900">{displayName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
            {initial}
          </div>

          <div className="hidden lg:block">
            <p className="text-sm font-bold text-slate-800">{displayName}</p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/change-password")}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-700"
        >
          <span className="hidden sm:inline">Change password</span>
          <span className="sm:hidden">Password</span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;