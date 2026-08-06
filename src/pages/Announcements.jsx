import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Searchbar from "../components/Searchbar";

function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchToggle, setSearchToggle] = useState(false)
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // null = add mode
    const [form, setForm] = useState({ title: "", body: "", emergency: false });
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    async function fetchAnnouncements() {
        setLoading(true);
        setError("");
        try {
            const { data } = await api.get("/announcements");
            setAnnouncements(data);
        } catch (err) {
            setError("Could not load announcements. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }

    function openAddModal() {
        setEditingItem(null);
        setForm({ title: "", body: "", emergency: false });
        setShowModal(true);
    }

    function openEditModal(item) {
        setEditingItem(item);
        setForm({ title: item.title, body: item.body, emergency: !!item.emergency });
        setShowModal(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingItem) {
                await api.put(`/announcements/${editingItem.id}`, form);
                setToast({ type: "success", text: "Announcement updated successfully." });
            } else {
                await api.post("/announcements", form);
                setToast({ type: "success", text: "Announcement posted successfully." });
            }
            setShowModal(false);
            fetchAnnouncements();
        } catch (err) {
            setToast({ type: "error", text: "Failed to save announcement. Please try again." });
        } finally {
            setSaving(false);
            setTimeout(() => setToast(null), 3500);
        }
    }

    async function handleDelete(item) {
        const ok = window.confirm(`Delete "${item.title}"? This cannot be undone.`);
        if (!ok) return;
        setDeletingId(item.id);
        try {
            await api.delete(`/announcements/${item.id}`);
            setToast({ type: "success", text: "Announcement deleted." });
            fetchAnnouncements();
        } catch (err) {
            setToast({ type: "error", text: "Failed to delete announcement." });
        } finally {
            setDeletingId(null);
            setTimeout(() => setToast(null), 3500);
        }
    }

    return (
        <div className="p-2">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
                <div className="flex gap-2 items-center">
                    {searchToggle ? (
                        <Searchbar page={"Announcements"} setSearchToggle={() => setSearchToggle(prev => !prev)} />
                    ) : (
                        <div className="relative">
                            <button className="before:block before:absolute before:bg-gray-400 before:transition-all before:duration-600 hover:before:content-['Search'] before:-top-6 before:-left-4
          before:text-white before:opacity-0 hover:before:opacity-100 before:px-2 py-1">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className=""
                                    onClick={() => setSearchToggle(prev => !prev)} />
                            </button>
                        </div>
                    )}
                    <button className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
                        onClick={openAddModal}>+ Create Announcement</button>
                </div>
            </div>

            {toast && (
                <div
                    className={`mb-4 p-3 rounded text-sm ${toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                >
                    {toast.text}
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading announcements...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-600">{error}</div>
            ) : announcements.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-lg">No announcements found</p>
                    <p className="text-sm">Create your first announcement to get started.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {announcements.map((a) => (
                        <div
                            key={a.id}
                            className={`p-4 rounded shadow-sm bg-white border-l-4 ${a.emergency ? "border-red-500" : "border-gray-200"
                                }`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Link to={`/announcements/${Number(a.id)}`}>
                                            <h3 className="font-bold text-gray-800">{a.title}</h3>
                                        </Link>
                                        {a.emergency && (
                                            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                EMERGENCY
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-2">{a.body}</p>
                                </div>
                                <div className="flex gap-2 shrink-0 ml-4">
                                    <button onClick={() => openEditModal(a)} className="text-blue-600 text-sm hover:underline">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(a)}
                                        disabled={deletingId === a.id}
                                        className="text-red-600 text-sm hover:underline disabled:opacity-50"
                                    >
                                        {deletingId === a.id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            {editingItem ? "Edit Announcement" : "Create Announcement"}
                        </h2>

                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full border rounded p-2 mb-3" />

                        <label className="block text-sm font-medium mb-1">Body</label>
                        <textarea required rows={4} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
                            className="w-full border rounded p-2 mb-3" />

                        <div className="flex items-center gap-2 mb-5 p-2 rounded bg-red-50">
                            <input type="checkbox" id="emergency" checked={form.emergency}
                                onChange={(e) => setForm({ ...form, emergency: e.target.checked })} />
                            <label htmlFor="emergency" className="text-sm font-medium text-red-700">
                                Mark as Emergency
                            </label>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">
                                Cancel
                            </button>
                            <button type="submit" disabled={saving}
                                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
                                {saving ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Announcements;