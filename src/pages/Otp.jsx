import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Otp() {

    // ============================================================================================
    //STATES & VARIABLES ==========================================================================
    // ============================================================================================

    const navigate = useNavigate()
    const [time, setTime] = useState(null)
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const email = localStorage.getItem("otp-email");
    const otpToken = localStorage.getItem("otp-token");

    // ============================================================================================
    // USE-EFFECTS & FUNCTIONS ====================================================================
    // ============================================================================================

    useEffect(() => {
        if (time === null) return;

        if (time === 0) {
            navigate("/reset-password");
            return;
        }
        setToast(null)
        const timer = setTimeout(() => {
            setTime(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [time, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        setToast("");
        setLoading(true);

        try {
            const { data } = await api.post(
                "verify_code",
                { otp },
                { headers: { Authorization: `Bearer ${otpToken}` } }
            )
            localStorage.setItem("reset-token", data.resetToken);

            const itemsToClear = ["otp-token", "otp-email"]
            itemsToClear.forEach(item => localStorage.removeItem(item))

            setToast({ type: "success", text: data.message })
            setTime(5)
        } catch (error) {
            if (error.response?.status === 401) {
                const errorText = error.response.data
                setToast({ type: "", text: errorText.error })
            } else {
                setToast({ type: "", text: "Something went wrong. Please try again." })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
            <form onSubmit={handleSubmit}
                className="w-full rounded-3xl bg-white p-8 shadow-xl shadow-slate-300/50 sm:p-10">
                <p className="text-sm font-bold tracking-[0.25em] text-teal-600">
                    LECTRA SECURITY
                </p>

                <h1 className="mt-3 text-3xl font-bold text-slate-900">
                    Verify your identity
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Enter the six-digit verification code sent to {email} to continue to the admin
                    workspace.
                </p>

                {toast && (
                    <div
                        className={`mb-5 p-3 rounded border text-sm ${toast.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                        {toast.text}
                    </div>
                )}
                {time !== null && (
                    <div
                        className="mb-5 p-3 rounded border text-sm bg-green-50 text-green-700 border-green-200">
                        Verification successsful. Redirecting in {time}s
                    </div>
                )}

                <label className="mb-2 mt-6 block text-sm font-semibold text-slate-700">
                    Verification code
                </label>

                <input type="text" inputMode="numeric" maxLength="6"
                    value={otp} placeholder="••••••" required
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] text-slate-900 outline-none transition placeholder:tracking-normal focus:border-teal-500 focus:ring-4 focus:ring-teal-100" />

                <button type="submit" disabled={loading || time !== null}
                    className="mt-6 w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60">
                    {loading ? "Verifying..." : "Verify and continue"}
                </button>

                <button type="button" onClick={() => navigate("/login")}
                    className="mt-5 w-full text-sm font-semibold text-slate-500">
                    Back to login
                </button>
            </form>
        </main>
    )
}