import { useState, useEffect } from "react";
import api from "../api/axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // null = add mode
  const [form, setForm] = useState({ code: "", title: "", lecturer: "", department: "" });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      setError("Could not load courses. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchDepartments() {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      // Non-fatal — the dropdown just stays empty if this fails
      setDepartments([]);
    }
  }

  function openAddModal() {
    setEditingCourse(null);
    setForm({ code: "", title: "", lecturer: "", department: "" });
    setShowModal(true);
  }

  function openEditModal(course) {
    setEditingCourse(course);
    setForm({
      code: course.code,
      title: course.title,
      lecturer: course.lecturer || "",
      department: course.department || "",
    });
    setShowModal(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingCourse) {
        await api.put(`/courses/${editingCourse.id}`, form);
        setToast({ type: "success", text: "Course updated successfully." });
      } else {
        await api.post("/courses", form);
        setToast({ type: "success", text: "Course added successfully." });
      }
      setShowModal(false);
      fetchCourses();
    } catch (err) {
      setToast({ type: "error", text: "Failed to save course. Please try again." });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3500);
    }
  }

  async function handleDelete(course) {
    const ok = window.confirm(`Delete ${course.code} — ${course.title}? This cannot be undone.`);
    if (!ok) return;
    setDeletingId(course.id);
    try {
      await api.delete(`/courses/${course.id}`);
      setToast({ type: "success", text: "Course deleted." });
      fetchCourses();
    } catch (err) {
      setToast({ type: "error", text: "Failed to delete course." });
    } finally {
      setDeletingId(null);
      setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
        >
          + Add Course
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
        <div className="text-center py-10 text-gray-500">Loading courses...</div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No courses found</p>
          <p className="text-sm">Add your first course to get started.</p>
        </div>
      ) : (
        <table className="w-full border-collapse bg-white shadow-sm rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-3">Code</th>
              <th className="p-3">Title</th>
              <th className="p-3">Lecturer</th>
              <th className="p-3">Department</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t text-sm">
                <td className="p-3 font-medium">{c.code}</td>
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.lecturer}</td>
                <td className="p-3">{c.department}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEditModal(c)} className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c)}
                    disabled={deletingId === c.id}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {deletingId === c.id ? "Deleting..." : "Delete"}
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
              {editingCourse ? "Edit Course" : "Add Course"}
            </h2>

            <label className="block text-sm font-medium mb-1">Course Code</label>
            <input
              required
              placeholder="e.g. CSC301"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block text-sm font-medium mb-1">Course Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded p-2 mb-3"
            />

            <label className="block text-sm font-medium mb-1">Lecturer</label>
            <input
              value={form.lecturer}
              onChange={(e) => setForm({ ...form, lecturer: e.target.value })}
              className="w-full border rounded p-2 mb-3"
              placeholder="Lecturer name"
            />

            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              required
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full border rounded p-2 mb-5"
            >
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>

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

export default Courses;