import api from "./axios";

export async function getAnnouncements() {
    try {
        const { data } = await api.get("/announcements");
        return data;
    } catch (error) {
        console.error("Error fetching anouncements at: ", error)
    }
}

export async function getAnnouncement(id) {
    try {
        const { data } = await api.get(`/announcements/${id}`)
        return data;
    } catch {
        console.error("Error fetching announcement at: ", error)
    }
}