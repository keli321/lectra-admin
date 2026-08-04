import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const DEMO_MODE = true;

const DEMO_ADMIN = {
  email: "admin@lectra.edu",
  password: "lectra123",
  name: "Lectra Admin",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const loginButtonRef = useRef(null);

const [transitionOrigin, setTransitionOrigin] = useState({
  x: "50%",
  y: "50%",
});

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
  if (DEMO_MODE) {
    // Makes the demo feel like a real request is happening.
    await new Promise((resolve) => setTimeout(resolve, 700));

    const enteredEmail = email.trim().toLowerCase();
const savedDemoPassword =
  localStorage.getItem("demoPassword") || DEMO_ADMIN.password;
    if (
  enteredEmail !== DEMO_ADMIN.email ||
  password !== savedDemoPassword
) {
      setError("Invalid email or password. Please try again.");
      return;
    }

   sessionStorage.setItem(
  "pendingUser",
  JSON.stringify({
    name: DEMO_ADMIN.name,
    email: DEMO_ADMIN.email,
    role: "Admin",
  })
);
    
const buttonPosition = loginButtonRef.current.getBoundingClientRect();

setTransitionOrigin({
  x: `${buttonPosition.left + buttonPosition.width / 2}px`,
  y: `${buttonPosition.top + buttonPosition.height / 2}px`,
});
   setIsTransitioning(true);
await new Promise((resolve) => setTimeout(resolve, 900));
navigate("/verify-otp");
    return;
  }

  // This runs later, when the real backend API is ready.
  const res = await api.post("/login", { email, password });
  const { token, user } = res.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

const buttonPosition = loginButtonRef.current.getBoundingClientRect();

setTransitionOrigin({
  x: `${buttonPosition.left + buttonPosition.width / 2}px`,
  y: `${buttonPosition.top + buttonPosition.height / 2}px`,
});

 setIsTransitioning(true);
await new Promise((resolve) => setTimeout(resolve, 900));
navigate("/dashboard");
} catch (err) {
  if (err.response?.status === 401) {
    setError("Invalid email or password.");
  } else {
    setError("Something went wrong. Please try again.");
  }
} finally {
  setLoading(false);
} 
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100">
      {/* Success transition layer */}
      <div
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-teal-500 text-white"
        style={{
          clipPath: isTransitioning
            ? `circle(150vmax at ${transitionOrigin.x} ${transitionOrigin.y})`
            : `circle(0px at ${transitionOrigin.x} ${transitionOrigin.y})`,
          transition: "clip-path 700ms cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white text-3xl">
            ✓
          </div>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-teal-50">Preparing your security check...</p>
        </div>
      </div>

    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <section className="hidden w-1/2 flex-col justify-between bg-slate-900 p-12 text-white lg:flex">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] text-teal-300">
            LECTRA
          </p>
          <h1 className="mt-5 max-w-md text-5xl font-bold leading-tight">
            Manage learning with clarity.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-300">
            One secure space to manage users, departments, courses,
            timetables, notifications, and announcements.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-5">
          <p className="text-sm text-slate-300">Secure admin access</p>
          <p className="mt-1 font-semibold text-teal-300">
            Built for the LECTRA academic system
          </p>
        </div>
      </section>

      {/* Login form panel */}
      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-300/50 sm:p-10"
        >
          <div className="mb-8">
            <p className="text-sm font-bold tracking-[0.25em] text-teal-600 lg:hidden">
              LECTRA
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Admin login
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your details to access the admin workspace.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@lectra.edu"
            required
            className="mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          />

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="mb-3 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          />

         <button
  ref={loginButtonRef}
  type="submit"
  disabled={loading || isTransitioning}
  className="w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
>
            Forgot password?
          </button>

          <button
            type="submit"
            disabled={loading || isTransitioning}
          className="mt-4 w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Checking your details..." : "Login securely"}
          </button>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Admin accounts are issued by the system administrator.
          </p>
        </form>
      </main>
    </div>
  </div>
);
}

export default Login;
