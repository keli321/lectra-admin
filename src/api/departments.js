import api from "./axios";

export async function getDepartments() {
    try {
        const { data } = await api.get("/departments");
        return data;
    } catch (err) {
        console.error("Error fetching departmets at: ", err);
    }
}