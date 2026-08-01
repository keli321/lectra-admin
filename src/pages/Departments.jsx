import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Top from "../components/Top";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { getDepartments, getSchools, sendData, deleteDepartment } from "../services/apiCalls";
import { getTime } from "../utils/functions";
import Table from "../components/Table";
import { Toaster, toast } from "react-hot-toast"

export default function Departments() {

    // ===============================================
    // STATES ========================================
    // ===============================================

    const [isLoading, setIsLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [schools, setSchools] = useState([]);
    const maxPages = Math.ceil(departments.length / 10);
    const [pageNumber, setPageNumber] = useState(1);
    let initial = (pageNumber - 1) * 10;
    let end = initial + 10;
    const [query, setQuery] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [issubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        school: "",
        hod: "",
        email: ""
    });

    // ===============================================
    // FUNCTIONS & USE-EFFECTS =======================
    // ===============================================

    useEffect(() => {
        async function fetchData() {
            try {
                const [departmentsData, schoolsData] =
                    await Promise.all([
                        getDepartments(),
                        getSchools()
                    ]);

                setDepartments(departmentsData);
                setSchools(schoolsData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

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
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    async function submitForm(e) {
        e.preventDefault();

        setIsSubmitting(true)

        try {
            const newDepartment = {
                id: Date.now(),
                name: formData.name,
                school: formData.school,
                hod: formData.hod,
                email: formData.email,
                dateCreated: getTime()
            }
            const response = await sendData(newDepartment);
            toast.success(`Department successfully ${response.statusText.toLowerCase()}`)
            setDepartments(prev => [...prev, newDepartment]);
            setFormData({
                name: "",
                school: "",
                hod: "",
                lecturerNo: "",
                studentNo: ""
            })
            setOpenForm(prev => !prev);
        } catch (error) {
            toast.error(error.message || "Something went wrong.")
        } finally {
            setIsSubmitting(true)
        }
    }
    function formControl() {
        setOpenForm(prev => !prev);
    }
    async function deleteUser(id) {

        try {
            const isDeleted = await deleteDepartment(id);
            setDepartments(isDeleted)
            toast.success("Department deleted succesfully");
        } catch (error) {
            toast.error("Something went wrong")
            console.error("Something went wrong: ", error);
        }
    }

    if (isLoading) {
        return (
            <>
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
                <Skeleton height={70} />
            </>
        )
    }

    return (
        <section>
            <Toaster />
            <Top page="Departments" readInput={(e) => setQuery(e.target.value)}
                formControl={formControl} />
            <div className="overflow-x-auto rounded-lg border border-gray-200 mt-4">
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr className="text-sm font-semibold text-gray-700">
                            <th className="px-5 py-4">Department</th>
                            <th className="px-5 py-4">School</th>
                            <th className="px-5 py-4">HOD</th>
                            <th className="px-5 py-4">Total Lecturers</th>
                            <th className="px-5 py-4 text-center">Total Students</th>
                            <th className="px-5 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {query.length > 1
                            ? departments.filter(dept => {
                                const searchable = `${dept.departmentName} ${dept.school} ${dept.hod}`.toLowerCase()
                                return searchable.includes(query.toLowerCase())
                            }).map(dept => <Table key={dept.id} id={dept.id} one={dept.departmentName} two={dept.school} three={dept.hod} four={dept.totalLecturers} five={dept.totalStudents}
                                info={"Department"} deleteFunc={() => deleteUser(dept.id)} />)
                            : (
                                departments.slice(initial, end).map(dept => (
                                    <Table key={dept.id} id={dept.id} one={dept.departmentName} two={dept.school} three={dept.hod} four={dept.totalLecturers} five={dept.totalStudents}
                                        info={"Department"} deleteFunc={() => deleteUser(dept.id)} />
                                ))
                            )}
                    </tbody>
                </table>
            </div>
            <div className="w-full mt-4 sm:h-10 flex justify-between">
                Showing {initial + 1} to {end} of {departments.length} users
                <span className="flex items-center gap-4">
                    <button className="py-2 px-3 text-xl font-medium rounded-lg bg-[#FFC107] cursor-pointer"
                        onClick={reducePage}>&lt;</button>
                    {pageNumber}
                    <button className="py-2 px-3 text-xl font-medium rounded-lg bg-[#FFC107] cursor-pointer"
                        onClick={addPage}>&gt;</button>
                </span>
            </div>
            {openForm &&
                <div className=" absolute top-30 left-1/2 w-full max-w-md rounded-xl bg-white p-6 shadow-md">
                    <h2 className="mb-6 text-xl font-bold text-[#2D1B69]">Add New Department</h2>
                    <button className=" cursor-pointer absolute top-[5%] right-[10%] transition-transform duration-500 ease-in-out hover:rotate-360 "
                        onClick={formControl}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                    <form className="space-y-4" onSubmit={submitForm}>
                        <div>
                            <label className="mb-1 block text-sm font-medium">Department Name</label>
                            <input type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">School</label>
                            <select className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" name="school" value={formData.school} onChange={handleChange}>
                                <option value={""}>Select School</option>
                                {schools.map(sch => (
                                    <option key={sch.id} value={sch.name}>{sch.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">HOD</label>
                            <input type="text" name="hod" placeholder="Enter HOD name" value={formData.hod} onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">HOD Email</label>
                            <input type="email" name="email" placeholder="Enter HOD email" value={formData.email} onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-[#2D1B69]" />
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button className="cursor-pointer rounded-md border border-gray-300 px-4 py-2"
                                type="button" onClick={formControl}>Cancel</button>
                            <button className="cursor-pointer rounded-md bg-[#FFC107] px-4 py-2 font-medium text-black"
                                type="submit">Save Department</button>
                        </div>
                    </form>
                </div>}
        </section>
    )
}