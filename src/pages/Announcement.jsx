import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import { getAnnouncement } from "../api/announcements";

export default function Announcement() {

    // ==========================================
    // STATES & VARIABLES =======================
    // ==========================================

    const { annId } = useParams();
    const id = Number(annId);
    const [announcement, setAnnouncement] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);


    // ==========================================
    // USE-EFFECTS & FUNCTIONS ==================
    // ==========================================

    useEffect(() => {
        fetchAnnouncement();
    }, [])

    async function fetchAnnouncement() {
        setLoading(true);
        setError("");
        try {
            const data = await getAnnouncement(1);
            setAnnouncement(data);
        } catch (err) {
            setError("Could not load announcements. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            {toast && (
                <div className={`mb-4 p-3 rounded text-sm ${toast.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {toast.text}
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading announcement...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
                <div className="flex flex-col gap-10">
                    <h1 className="text-center font-semibold text-2xl">{announcement.title}</h1>
                    <article>{announcement.body}</article>
                </div>
            )}
        </section>
    )
}