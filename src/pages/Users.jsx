import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPencil, faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { users } from "../utils/testData.js"
import Top from "../components/Top.jsx";
import Table from "../components/Table.jsx";

export default function Users() {

    // ===============================================
    // STATES ========================================
    // ===============================================

    const [testUsers, setTestUsers] = useState(users);
    const [query, setQuery] = useState("")
    const [openForm, setOpenForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        department: ""
    });
    const maxPages = Math.ceil(testUsers.length / 10);
    const [pageNumber, setPageNumber] = useState(1);
    const initial = (pageNumber - 1) * 10;
    const end = initial + 10;

    // ===============================================
    // FUNCTIONS =====================================
    // ===============================================

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    function submitForm(e) {
        e.preventDefault();

        setTestUsers(prev => [...prev, {
            id: Date.now(),
            ...formData
        }]);
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "",
            department: ""
        })
        setOpenForm(prev => !prev);
    }
    function formControl() {
        setOpenForm(prev => !prev);
    }
    const addPage = () => {
        setPageNumber(prev => {
            if (pageNumber === maxPages) {
                return prev;
            }
            return prev + 1;
        })
    }
    const reducePage = () => {
        setPageNumber(prev => {
            if (pageNumber === 1) {
                return 1;
            }
            return prev - 1;
        })
    }
    function deleteUser(userId) {
        setTestUsers(prev => prev.filter(user => user.id !== userId))
    }

    return (
        <section>
            <Top page="Users" formControl={formControl} />
            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr className="text-sm font-semibold text-gray-700">
                            <th className="px-5 py-4">Name</th>
                            <th className="px-5 py-4">Email</th>
                            <th className="px-5 py-4">Role</th>
                            <th className="px-5 py-4">Department</th>
                            <th className="px-5 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testUsers.slice(initial, end).map((user, index) => (
                            <Table key={user.id} id={user.id} one={user.name}
                                two={user.email} three={user.role} four={user.department}
                                info="User"
                                deleteFunc={() => deleteUser(user.id)} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full mt-4 sm:h-10 flex justify-between">
                Showing {initial + 1} to {end} of {testUsers.length} users
                <span className="flex items-center gap-2">
                    <button className="h-full bg-gray-400 px-2 cursor-pointer"
                        onClick={reducePage}>&lt;</button>
                    {pageNumber}
                    <button className="h-full bg-gray-400 px-2 cursor-pointer"
                        onClick={addPage}>&gt;</button>
                </span>
            </div>
            {openForm &&
                <div className=" absolute top-30 left-1/2 w-full max-w-md rounded-xl bg-white p-6 shadow-md">
                    <h2 className="mb-6 text-xl font-bold text-[#2D1B69]">Add New User</h2>
                    <button className=" cursor-pointer absolute top-[5%] right-[10%]"
                        onClick={formControl}><FontAwesomeIcon icon={faX} /></button>
                    <form className="space-y-4" onSubmit={submitForm}>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Full Name</label>
                            <input type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Email</label>
                            <input type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Password</label>
                            <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Role</label>
                            <select className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" name="role" value={formData.role} onChange={handleChange}>
                                <option>Select role</option>
                                <option value="Admin">Admin</option>
                                <option value="Lecturer">Lecturer</option>
                                <option value="Student">Student</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Department</label>
                            <select className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" name="department" value={formData.department} onChange={handleChange}>
                                <option>Select department</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Computer Engineering">Computer Engineering</option>
                                <option value="SLT">SLT</option>
                            </select>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button className="rounded-md border border-gray-300 px-4 py-2"
                                type="button">Cancel</button>
                            <button className="rounded-md bg-[#FFC107] px-4 py-2 font-medium text-black"
                                type="submit">Save User</button>
                        </div>
                    </form>
                </div>
            }
        </section>
    )
}