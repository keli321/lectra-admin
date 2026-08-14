import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import PasswordInput from "../components/PasswordInput"
import api from "../api/axios";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function ForgotPassword() {

    // ============================================================================================
    //STATES & VARIABLES ==========================================================================
    // ============================================================================================
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [error, setError] = useState("");


    // ============================================================================================
    // USE-EFFECTS & FUNCTIONS ====================================================================
    // ============================================================================================

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setToast("")
        setLoading(true);

        try {
            const { data } = await api.post("/forgot_password", { email });
            localStorage.setItem("otp-token", data.token);
            localStorage.setItem("otp-email", data.email);
            setToast({ type: "success", text: data.message });
            setTimeout(() => {
                navigate("/otp-verification");
            }, 3000);
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
                <form className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-300/50 sm:p-10"
                    onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <p className="text-sm font-bold tracking-[0.25em] text-teal-600 lg:hidden">
                            LECTRA
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                            Forgot Password
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Enter your details to recover your account.
                        </p>
                    </div>

                    {toast && (
                        <div
                            className={`mb-5 p-3 rounded border text-sm ${toast.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                            {toast.text}
                        </div>
                    )}

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Email address
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@lectra.edu" required
                        className="mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100" />

                    <button type="submit" disabled={loading}
                        className="mt-4 w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? "Checking your details..." : "Send email"}
                    </button>

                    <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                        Admin accounts are issued by the system administrator.
                    </p>
                </form>
            </main>
        </div>
    )
}