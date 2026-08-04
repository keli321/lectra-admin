import { useState, useEffect } from "react";
import api from "../api/axios";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState(null); // null = add mode
  const [form, setForm] = useState({ name: "", faculty: "" });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function fetchDepartments() {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/schools/departments");
      setDepartments(data);
    } catch (err) {
      setError("Could not load departments. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingDept(null);
    setForm({ name: "", faculty: "" });
    setShowModal(true);
  }

  function openEditModal(dept) {
    setEditingDept(dept);
    setForm({ name: dept.name, faculty: dept.faculty });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingDept) {
        await api.put(`/departments/${editingDept.id}`, form);
        setToast({ type: "success", text: "Department updated successfully." });
      } else {
        await api.post("/departments", form);
        setToast({ type: "success", text: "Department added successfully." });
      }
      setShowModal(false);
      fetchDepartments();
    } catch (err) {
      setToast({ type: "error", text: "Failed to save department. Please try again." });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3500);
    }
  }

  async function handleDelete(dept) {
    const ok = window.confirm(`Delete ${dept.name}? This cannot be undone.`);
    if (!ok) return;
    setDeletingId(dept.id);
    try {
      await api.delete(`/schools/departments/delete_department/${dept.id}`);
      setToast({ type: "success", text: "Department deleted." });
      fetchDepartments();
    } catch (err) {
      setToast({ type: "error", text: "Failed to delete department." });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
        >
          + Add Department
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
        <div className="text-center py-10 text-gray-500">Loading departments...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : departments.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No departments found</p>
          <p className="text-sm">Add your first department to get started.</p>
        </div>
      ) : (
        <table className="w-full border-collapse bg-white shadow-sm rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-3">Department</th>
              <th className="p-3">Faculty</th>
              <th className="p-3">HOD</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.id} className="border-t text-sm">
                <td className="p-3">{d.departmentName}</td>
                <td className="p-3">{d.school}</td>
                <td className="p-3">{d.hod}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEditModal(d)} className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d)}
                    disabled={deletingId === d.id}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {deletingId === d.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {editingDept ? "Edit Department" : "Add Department"}
            </h2>

            <label className="block text-sm font-medium mb-1">Department Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block text-sm font-medium mb-1">Faculty</label>
            <input
              required
              value={form.faculty}
              onChange={(e) => setForm({ ...form, faculty: e.target.value })}
              className="w-full border rounded p-2 mb-5"
            />

            <div className="flex justify-end gap-2">
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

export default Departments;