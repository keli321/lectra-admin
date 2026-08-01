import axios from "axios";

const API = axios.create({
    baseURL: "https://lectra-test-backend.onrender.com/api"
})

export async function getDepartments() {
    try {
        const { data } = await API.get("/schools/departments");
        return data;
    } catch (error) {
        console.error(error)
    }
}

export async function getSchools() {
    try {
        const { data } = await API.get("/schools")
        return data;
    } catch (error) {
        console.error(error)
    }
}

export async function sendData(input) {
    const res = await API.post("/schools/departments/new_department", input)
    console.log(res.statusText);
    return res
}

export async function deleteDepartment(id) {
    const res = await API.delete(`/schools/departments/delete_department/${id}`);
    const data = await getDepartments();
    return data;
}