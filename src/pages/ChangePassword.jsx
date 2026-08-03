import { useState } from "react";

const DEFAULT_DEMO_PASSWORD = "lectra123";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const savedPassword =
      localStorage.getItem("demoPassword") || DEFAULT_DEMO_PASSWORD;

    if (currentPassword !== savedPassword) {
      setError("Your current password is incorrect.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Your new password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Your new passwords do not match.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    // Demo only. Real passwords must be changed securely by the backend.
    localStorage.setItem("demoPassword", newPassword);

    setSuccess("Your password has been changed successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setLoading(false);
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <p className="text-sm font-bold tracking-[0.2em] text-teal-600">
          ACCOUNT SECURITY
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Change password
        </h1>
        <p className="mt-2 text-slate-500">
          Use a strong password that you do not use elsewhere.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
      >
        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-teal-200 bg-teal-50 p-3 text-sm text-teal-800">
            {success}
          </div>
        )}

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Current password
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          New password
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength="8"
          required
          className="mb-5 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Confirm new password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength="8"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-7 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Changing password..." : "Update password"}
        </button>
      </form>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        This version stores the changed password only for the demo. The real
        system will send password changes to the API securely.
      </p>
    </div>
  );
}

export default ChangePassword;