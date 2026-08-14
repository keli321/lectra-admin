import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../api/axios";
import PasswordInput from "../components/PasswordInput"

export default function ResetPassword() {

    // ============================================================================================
    //STATES & VARIABLES ==========================================================================
    // ============================================================================================

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [form, setForm] = useState({
        newPassword: "",
        confirm: ""
    })
    const token = localStorage.getItem("reset-token");


    // ============================================================================================
    // USE-EFFECTS & FUNCTIONS ====================================================================
    // ============================================================================================

    async function handleSubmit(e) {
        e.preventDefault();
        setToast("");
        setLoading(true);

        try {
            if (form.newPassword.length < 8 || form.confirm.length < 8) {
                setToast({ type: "", text: "Your new password must be at least 8 characters." });
                return;
            }
            if (form.newPassword !== form.confirm) {
                setToast({ type: "", text: "Your new passwords do not match." });
                return;
            }

            const { data } = await api.post("reset_password", form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setToast({ type: "success", text: data.message })
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error(error)
            setToast({ type: "", text: "Failed to change password. Please try again" })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen">
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

            <main className="flex flex-1 items-center justify-center px-5 py-10">
                <form className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-300/50 sm:p-10"
                    onSubmit={handleSubmit}>
                    <div className="mb-8">
                        <p className="text-sm font-bold tracking-[0.25em] text-teal-600 lg:hidden">
                            LECTRA
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                            Enter New Password
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Enter you new password.
                        </p>
                    </div>

                    {toast && (
                        <div
                            className={`mb-5 p-3 rounded border text-sm ${toast.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                            {toast.text}
                        </div>
                    )}

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        New Password
                    </label>
                    <PasswordInput className="mb-5 w-full rounded-xl border tracing-[0.5em] border-slate-300 px-4 py-3 pr-15 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                        required value={form.newPassword} onChange={(e) => setForm(prev => ({ ...prev, newPassword: e.target.value }))} />
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Confirm New Password
                    </label>
                    <PasswordInput className="mb-5 w-full rounded-xl border tracing-[0.5em] border-slate-300 px-4 py-3 pr-15 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                        required value={form.confirm} onChange={(e) => setForm(prev => ({ ...prev, confirm: e.target.value }))} />

                    <button type="submit" disabled={loading}
                        className="mt-4 w-full rounded-xl bg-teal-600 py-3 font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? <span className="loading-effect">Loading...</span> : "Confirm"}
                    </button>

                    <p className="mt-6 text-center text-xs leading-5 text-slate-500">
                        Admin accounts are issued by the system administrator.
                    </p>
                </form>
            </main>
        </div>
    )
}