import api from "./axios.js";

export async function getDepartments() {
    try {
        const { data } = await api.get("/departments");
        return data;
    } catch (err) {
        console.error("Error fetching departments at: ", err);
    }
}