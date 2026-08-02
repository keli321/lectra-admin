import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function FaceVerification() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraError, setCameraError] = useState("");
  const [status, setStatus] = useState("ready");
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    async function startCamera() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera access is not supported in this browser.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (!isActive) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setCameraError(
          "Camera access was not granted. You can return and use OTP verification instead."
        );
      }
    }

    startCamera();

    return () => {
      isActive = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function handleVerification() {
    setStatus("scanning");

    await new Promise((resolve) => setTimeout(resolve, 1800));

    setStatus("verified");

    await new Promise((resolve) => setTimeout(resolve, 900));

    const pendingUser = JSON.parse(
      sessionStorage.getItem("pendingUser") || "null"
    );

    localStorage.setItem("token", `demo-token-${Date.now()}`);
    localStorage.setItem("user", JSON.stringify(pendingUser));

    sessionStorage.removeItem("pendingUser");

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-teal-500 px-5 py-10">
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-xl items-center">
        <section className="w-full rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
          <p className="text-sm font-bold tracking-[0.2em] text-teal-600">
            LECTRA SECURITY
          </p>

          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            Face verification
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Position your face inside the frame and begin verification.
          </p>

          <div className="relative mt-7 aspect-square overflow-hidden rounded-3xl bg-slate-900">
            {!cameraError && (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-slate-950/20" />

            <div
              className={`absolute left-1/2 top-1/2 h-56 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[45%] border-4 ${
                status === "verified"
                  ? "border-teal-300"
                  : "border-white"
              } ${status === "scanning" ? "animate-pulse" : ""}`}
            />

            {status === "scanning" && (
              <div className="absolute left-8 right-8 top-1/2 h-1 bg-teal-300 shadow-[0_0_20px_4px_rgba(94,234,212,0.8)]" />
            )}

            {status === "verified" && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
                <div className="rounded-full bg-teal-400 px-5 py-3 font-bold text-slate-900">
                  Face verified ✓
                </div>
              </div>
            )}

            {cameraError && (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-white">
                {cameraError}
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Demo prototype: no facial image is stored or sent anywhere.
          </p>

          <button
            type="button"
            onClick={handleVerification}
            disabled={Boolean(cameraError) || status !== "ready"}
            className="mt-7 w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "ready" && "Start face verification"}
            {status === "scanning" && "Scanning face..."}
            {status === "verified" && "Verification complete"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/verify-otp")}
            className="mt-5 w-full text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            Use OTP verification instead
          </button>
        </section>
      </main>
    </div>
  );
}

export default FaceVerification;