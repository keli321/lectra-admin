import api from "./axios";

export async function getSchools() {
    try {
        const { data } = await api.get("/schools");
        return data;
    } catch (err) {
        console.error("Error fetching schools at: ", err);
    }
} 