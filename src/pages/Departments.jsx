import { useState, useEffect } from "react";
import api from "../api/axios";
import { getDepartments } from "../api/departments";
import { getSchools } from "../api/schools";
import Pagination from "../components/Pagination";
import Searchbar from "../components/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Departments() {
    const [departments, setDepartments] = useState([]);
    const [schools, setSchools] = useState([]);
    const [searchToggle, setSearchToggle] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingDept, setEditingDept] = useState(null); // null = add mode
    const [form, setForm] = useState({ name: "", school: "" });
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setLoading(true);
        setError("");
        try {
            const [departmentRes, schoolRes] = await Promise.all([
                getDepartments(), getSchools()
            ])
            setDepartments(departmentRes);
            setSchools(schoolRes)
        } catch (error) {
            setError("Could not load data. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }

    function openAddModal() {
        setEditingDept(null);
        setForm({
            name: "",
            school: "",
            hod: ""
        });
        setShowModal(true);
    }

    function openEditModal(dept) {
        setEditingDept(dept);
        setForm({
            name: dept.name,
            school: dept.school,
            hod: dept.hod
        });
        setShowModal(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingDept) {
                const { data } = await api.put(`/departments/edit_dept/${editingDept.id}`, form);
                setToast({ type: "success", text: "Department updated successfully." });
            } else {
                await api.post("/departments/new_department", form);
                setToast({ type: "success", text: "Department added successfully." });
            }
            setShowModal(false);
            fetchData();
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
            await api.delete(`/departments/${dept.id}`);
            setToast({ type: "success", text: "Department deleted." });
            getDepartments();
        } catch (err) {
            setToast({ type: "error", text: "Failed to delete department." });
        } finally {
            setDeletingId(null);
            setTimeout(() => setToast(null), 3500);
        }
    }

    // ============================================
    // PAGINATION =================================
    // ============================================

    const MAX_PAGES = Math.ceil(departments.length / 10);
    const initial = (pageNumber - 1) * 10;
    const end = (initial + 10 > departments.length) ? (departments.length) : (initial + 10);
    function addPage() {
        setPageNumber(prev => {
            if (prev === MAX_PAGES) return prev;
            return prev + 1
        })
    }
    function reducePage() {
        setPageNumber(prev => {
            if (prev === 1) return 1;
            return prev - 1
        })
    }
    function goToPage(e) {
        const value = Number(e.target.innerText);
        setPageNumber(prev => value)
    }


    return (
        <div className="p-2">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
                <div className="flex gap-2 items-center">
                    {searchToggle ? (
                        <Searchbar setSearchToggle={() => setSearchToggle(prev => !prev)} />
                    ) : (
                        <FontAwesomeIcon icon={faMagnifyingGlass}
                            onClick={() => setSearchToggle(prev => !prev)} />
                    )}
                    <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                        onClick={openAddModal}>
                        + Add Department
                    </button>
                </div>
            </div>

            {toast && (
                <div
                    className={`mb-4 p-3 rounded text-sm ${toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
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
                            <th className="p-3">School</th>
                            <th className="p-3">HOD</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.slice(initial, end).map((d) => (
                            <tr key={d.id} className="border-t text-sm">
                                <td className="p-3">{d.name}</td>
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
                        <input required value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border rounded p-2 mb-3" />

                        <label className="block text-sm font-medium mb-1">HOD</label>
                        <input required value={form.hod}
                            onChange={(e) => setForm({ ...form, hod: e.target.value })}
                            className="w-full border rounded p-2 mb-3" />

                        <label className="block text-sm font-medium mb-1">School</label>
                        <select className="block text-sm font-medium w-full border rounded p-2 py-3 mb-5"
                            name="school" id="school" onChange={(e) => setForm({ ...form, school: e.target.value })}>
                            <option>Select School</option>
                            {schools.map(sch => (
                                <option key={sch.id} value={sch.name}>{sch.name}</option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded border">Cancel</button>
                            <button type="submit" disabled={saving}
                                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {!loading && <Pagination start={initial + 1} howMany={departments.length} end={end} goToPage={(e) => goToPage(e)} reducePage={reducePage} addPage={addPage}
                currentPage={pageNumber} lastPage={MAX_PAGES} />}
        </div>
    );
}

export default Departments;