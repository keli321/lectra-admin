import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const verifyButtonRef = useRef(null);

const [isTransitioning, setIsTransitioning] = useState(false);
const [transitionOrigin, setTransitionOrigin] = useState({
  x: "50%",
  y: "50%",
});

  useEffect(() => {
    const pendingUser = sessionStorage.getItem("pendingUser");

    if (!pendingUser) {
      navigate("/login", { replace: true });
    }
    
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (otp.trim() !== "123456") {
      setError("That verification code is incorrect.");
      return;
    }

setLoading(true);

const buttonPosition = verifyButtonRef.current.getBoundingClientRect();

setTransitionOrigin({
  x: `${buttonPosition.left + buttonPosition.width / 2}px`,
  y: `${buttonPosition.top + buttonPosition.height / 2}px`,
});

setIsTransitioning(true);

await new Promise((resolve) => setTimeout(resolve, 800));

const pendingUser = JSON.parse(
  sessionStorage.getItem("pendingUser") || "null"
);

localStorage.setItem("token", `demo-token-${Date.now()}`);
localStorage.setItem("user", JSON.stringify(pendingUser));

sessionStorage.removeItem("pendingUser");

navigate("/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-teal-500 px-5 py-10">
  <div
    className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-slate-900 text-white"
    style={{
      clipPath: isTransitioning
        ? `circle(150vmax at ${transitionOrigin.x} ${transitionOrigin.y})`
        : `circle(0px at ${transitionOrigin.x} ${transitionOrigin.y})`,
      transition: "clip-path 700ms cubic-bezier(0.76, 0, 0.24, 1)",
    }}
  >
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-300 text-3xl">
        ✓
      </div>
      <h2 className="text-3xl font-bold">Verification complete</h2>
      <p className="mt-2 text-slate-300">Opening your admin workspace...</p>
    </div>
  </div>
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-3xl bg-white p-8 shadow-xl shadow-slate-300/50 sm:p-10"
        >
          <p className="text-sm font-bold tracking-[0.25em] text-teal-600">
            LECTRA SECURITY
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Verify your identity
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter the six-digit verification code to continue to the admin
            workspace.
          </p>

          <div className="mt-6 rounded-xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-800">
            <span className="font-bold">Demo only:</span> use the code 123456
          </div>

          {error && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <label className="mb-2 mt-6 block text-sm font-semibold text-slate-700">
            Verification code
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="••••••"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] text-slate-900 outline-none transition placeholder:tracking-normal focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          />

         <button
  ref={verifyButtonRef}
  type="submit"
  disabled={loading}
  className="mt-6 w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Verifying..." : "Verify and continue"}
</button>


<div className="my-5 flex items-center gap-3">
  <div className="h-px flex-1 bg-slate-200" />
  <span className="text-xs font-semibold text-slate-400">OR</span>
  <div className="h-px flex-1 bg-slate-200" />
</div>

<button
  type="button"
  onClick={() => navigate("/face-verification")}
  className="w-full rounded-xl border border-slate-300 bg-white py-3 font-bold text-slate-700"
>
  Verify using face recognition
</button>

<button
  type="button"
  onClick={() => navigate("/login")}
  className="mt-5 w-full text-sm font-semibold text-slate-500"
>
  Back to login
</button>

</form>
      </main>
    </div>
  );
}

export default OtpVerification;