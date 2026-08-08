import api from "./axios";

export async function getUsers() {
    try {
        const { data } = await api.get("/users")
        return data;
    } catch (err) {
        console.error("Error fetching departmets at: ", error);
    }
}