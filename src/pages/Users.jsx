import { useState, useEffect } from "react";
import api from "../api/axios";
import { getUsers } from "../api/users";
import { sortDepartments } from "../utils/functions";
import { getDepartments } from "../api/departments";
import Pagination from "../components/Pagination";
import { Eye, EyeOff } from "lucide-react";

const ROLES = ["Admin", "Lecturer", "Student"];
const PAGE_SIZE = 8;

function Users() {
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null); // { type: 'success'|'error', text }
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null); // null = add mode
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "Student",
        department: ""
    });
    const [isClosed, setIsClosed] = useState(true)
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [thisEnd, setThisEnd] = useState(10);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        setError("");
        try {
            const [users, departments] = await Promise.all([getUsers(), sortDepartments()])
            setUsers(users);
            setDepartments(departments)
        } catch (err) {
            setError("Could not load users. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }

    function openAddModal() {
        setEditingUser(null);
        setForm({
            name: "",
            email: "",
            password: "",
            role: "Student",
            department: ""
        });
        setShowModal(true);
    }

    function openEditModal(user) {
        setEditingUser(user);
        setForm({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
            department: user.department || ""
        });
        setShowModal(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingUser) {
                await api.put(`/users/${editingUser.id}`, form);
            } else {
                await api.post("/users/new_user", form);
            }
            setToast({
                type: "success",
                text: editingUser ? "User updated successfully" : "User added successfully"
            })
            setShowModal(false);
            fetchUsers();
        } catch (err) {
            setToast({ type: "error", text: "Failed to save user. Please try again." });
        } finally {
            setSaving(false);
            setTimeout(() => setToast(null), 3500);
        }
    }

    async function handleDelete(user) {
        const ok = window.confirm(`Delete ${user.name}? This cannot be undone.`);
        if (!ok) return;
        setDeletingId(user.id);
        try {
            await api.delete(`/users/delete_user/${user.id}`);
            setToast({ type: "success", text: "User deleted." });
            fetchUsers();
        } catch (err) {
            setToast({ type: "error", text: "Failed to delete user." });
        } finally {
            setDeletingId(null);
            setTimeout(() => setToast(null), 3500);
        }
    }

    // ==========================================
    // PAGINATION ===============================
    // ==========================================

    const MAX_PAGES = Math.ceil(users.length / thisEnd);
    const initial = (pageNumber - 1) * thisEnd;
    const end = ((initial + thisEnd) > users.length) ? (users.length) : (initial + thisEnd);
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

    const filtered = users.filter((u) =>
        `${u.name} ${u.email} ${u.role} ${u.department}`.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
        <div className="p-2">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Users</h1>
                <button onClick={openAddModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
                    + Add User
                </button>
            </div>

            {toast && (
                <div className={`mb-4 p-3 rounded text-sm ${toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {toast.text}
                </div>
            )}

            <input
                type="text"
                placeholder="Search by name, email, role, or department..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full border rounded p-2 mb-4"
            />

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading users...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-600">{error}</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-lg">No users found</p>
                    <p className="text-sm">Try adjusting your search, or add a new user.</p>
                </div>
            ) : (
                <>
                    <table className="w-full border-collapse bg-white shadow-sm rounded overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm text-gray-600">
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Department</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageItems.slice(initial, end).map((u) => (
                                <tr key={u.id} className="border-t text-sm">
                                    <td className="p-3">{u.name}</td>
                                    <td className="p-3">{u.email}</td>
                                    <td className="p-3">{u.role}</td>
                                    <td className="p-3">{u.department}</td>
                                    <td className="p-3 flex gap-2">
                                        <button onClick={() => openEditModal(u)} className="text-blue-600 hover:underline">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(u)} disabled={deletingId === u.id}
                                            className="text-red-600 hover:underline disabled:opacity-50">
                                            {deletingId === u.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-lg p-6 w-96 shadow-lg"
                    >
                        <h2 className="text-lg font-bold mb-4">{editingUser ? "Edit User" : "Add User"}</h2>

                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input required value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border rounded p-2 mb-3" />

                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border rounded p-2 mb-3" />

                        <label className="block text-sm font-medium mb-1">
                            Password {editingUser && <span className="text-gray-400">(leave blank to keep unchanged)</span>}
                        </label>
                        <div className="relative">
                            <input type={isClosed ? "password" : "text"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className="w-full border rounded p-2 mb-3 pr-10" />
                            <button className="absolute top-1/6 right-0 mr-2" type="button"
                                onClick={() => setIsClosed(prev => !prev)}>
                                {isClosed ? <EyeOff /> : <Eye />}
                            </button>
                        </div>

                        <label className="block text-sm font-medium mb-1">Role</label>
                        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="w-full border rounded p-2 mb-3">
                            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>

                        <label className="block text-sm font-medium mb-1">Department</label>
                        <select value={form.department} onChange={(e) => setForm(prev => ({ ...prev, department: e.target.value }))}
                            className="w-full border rounded p-2 mb-3">
                            <option>Select Department</option>
                            {departments.map(dept => <option key={dept.id} value={dept.name}>{dept.name}</option>)}
                        </select>

                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded border">
                                Cancel</button>
                            <button type="submit" disabled={saving}
                                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {(!loading && !error) && <Pagination start={initial + 1} howMany={users.length} end={end}
                goToPage={(e) => setPageNumber(Number(e.target.innerText))} reducePage={reducePage} addPage={addPage}
                currentPage={pageNumber} lastPage={MAX_PAGES} setThisEnd={(e) => setThisEnd(Number(e.target.value))} />}
        </div>
    );
}

export default Users;