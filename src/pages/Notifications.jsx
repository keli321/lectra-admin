import { useState, useEffect } from "react";
import api from "../api/axios";

const TARGET_OPTIONS = ["All Students", "Specific Department", "Lecturers"];

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingNotif, setEditingNotif] = useState(null); // null = add mode
  const [form, setForm] = useState({
    title: "",
    message: "",
    target: "All Students",
    department: "",
    sendImmediately: true,
    scheduledAt: "",
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchNotifications();
    fetchDepartments();
  }, []);

  async function fetchNotifications() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      setError("Could not load notifications. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchDepartments() {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      setDepartments([]);
    }
  }

  function openAddModal() {
    setEditingNotif(null);
    setForm({ title: "", message: "", target: "All Students", department: "", sendImmediately: true, scheduledAt: "" });
    setShowModal(true);
  }

  function openEditModal(notif) {
    setEditingNotif(notif);
    setForm({
      title: notif.title,
      message: notif.message,
      target: notif.target || "All Students",
      department: notif.department || "",
      sendImmediately: !notif.scheduledAt,
      scheduledAt: notif.scheduledAt || "",
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      title: form.title,
      message: form.message,
      target: form.target,
      department: form.target === "Specific Department" ? form.department : null,
      scheduledAt: form.sendImmediately ? null : form.scheduledAt,
    };
    try {
      if (editingNotif) {
        await api.put(`/notifications/${editingNotif.id}`, payload);
        setToast({ type: "success", text: "Notification updated successfully." });
      } else {
        await api.post("/notifications", payload);
        setToast({ type: "success", text: "Notification created successfully." });
      }
      setShowModal(false);
      fetchNotifications();
    } catch (err) {
      setToast({ type: "error", text: "Failed to save notification. Please try again." });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3500);
    }
  }

  async function handleDelete(notif) {
    const ok = window.confirm(`Delete notification "${notif.title}"? This cannot be undone.`);
    if (!ok) return;
    setDeletingId(notif.id);
    try {
      await api.delete(`/notifications/${notif.id}`);
      setToast({ type: "success", text: "Notification deleted." });
      fetchNotifications();
    } catch (err) {
      setToast({ type: "error", text: "Failed to delete notification." });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
        >
          + Create Notification
        </button>
      </div>

      {toast && (
        <div
          className={`mb-4 p-3 rounded text-sm ${
            toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {toast.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading notifications...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No notifications found</p>
          <p className="text-sm">Create your first notification to get started.</p>
        </div>
      ) : (
        <table className="w-full border-collapse bg-white shadow-sm rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-3">Title</th>
              <th className="p-3">Message</th>
              <th className="p-3">Target</th>
              <th className="p-3">Created</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n) => (
              <tr key={n.id} className="border-t text-sm">
                <td className="p-3 font-medium">{n.title}</td>
                <td className="p-3 max-w-xs truncate">{n.message}</td>
                <td className="p-3">
                  {n.target === "Specific Department" ? `${n.department}` : n.target}
                </td>
                <td className="p-3">{n.createdAt}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      n.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {n.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEditModal(n)} className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(n)}
                    disabled={deletingId === n.id}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {deletingId === n.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-96 shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              {editingNotif ? "Edit Notification" : "Create Notification"}
            </h2>

            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              required
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block text-sm font-medium mb-1">Target</label>
            <select
              value={form.target}
              onChange={(e) => setForm({ ...form, target: e.target.value })}
              className="w-full border rounded p-2 mb-3"
            >
              {TARGET_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>

            {form.target === "Specific Department" && (
              <>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select
                  required
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full border rounded p-2 mb-3"
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </>
            )}

            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="sendImmediately"
                checked={form.sendImmediately}
                onChange={(e) => setForm({ ...form, sendImmediately: e.target.checked })}
              />
              <label htmlFor="sendImmediately" className="text-sm">Send immediately</label>
            </div>

            {!form.sendImmediately && (
              <>
                <label className="block text-sm font-medium mb-1">Schedule for</label>
                <input
                  type="datetime-local"
                  required
                  value={form.scheduledAt}
                  onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
                  className="w-full border rounded p-2 mb-3"
                />
              </>
            )}

            <div className="flex justify-end gap-2 mt-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Notifications;