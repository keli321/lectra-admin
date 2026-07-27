import { faBookOpen, faGraduationCap, faSchool, faUser } from "@fortawesome/free-solid-svg-icons";
import { departments } from "../utils/testData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useState } from "react";

function DepartmentCard({ data }) {

    return (
        <div className="border rounded-xl px-4 py-2 bg-[whitesmoke] shadow-[2px_2px_1px_1px_#453030]">
            <span className="flex justify-between py-3">
                <h3 className="font-bold">{data.department}</h3>
                <div className={`flex items-center rounded-2xl text-[12px] md:text-[1em] text-white px-1 ${data.isActive ? "bg-[#00C500]" : "bg-[#A00500]"}`}>{data.isActive === true ? "Active" : "Inactive"}</div>
            </span>
            <div className="flex justify-between py-3">
                <span className="flex flex-col items-center">
                    <FontAwesomeIcon icon={faGraduationCap} />
                    <span className="text-[12px] md:text-[1em]">HOD: {data.hod}</span>
                </span>
                <span className="flex flex-col items-center">
                    <FontAwesomeIcon icon={faSchool} />
                    <span className="text-[12px] md:text-[1em]">
                        Lecturers: {data.lecturers}</span>
                </span>
                <span className="flex flex-col items-center">
                    <FontAwesomeIcon icon={faBookOpen} />
                    <span className="text-[12px] md:text-[1em]">Courses: {data.courseNo}</span>
                </span>
                <span className="flex flex-col items-center">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="text-[12px] md:text-[1em]">Students: {data.studentNo}</span>
                </span>
                <button className=" text-[12px] cursor-pointer text-[#240f9b]">View Details &gt;</button>
            </div>
        </div>
    )
}

export default function Departments() {

    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const maxPages = Math.ceil(departments.length / 5);
    const initial = (pageNumber - 1) * 5;
    const end = initial + 5;

    function nextPage() {
        setPageNumber(prev => {
            if (prev === maxPages) return prev;
            return prev + 1;
        });
    }
    function previousPage() {
        setPageNumber(prev => {
            if (prev === 1) return prev;
            return prev - 1;
        });
    }

    return (
        <section className="min-h-[100dvh]">
            <h1 className="py-3">Departments Overview</h1>
            Total Departments: {departments.length}
            <div className="flex gap-4 items-center">
                <input className="border w-[300px] h-7 rounded-2xl px-4 py-3"
                    onChange={e => setQuery(prev => e.target.value)}
                    placeholder="Enter department to search"
                    type="search" name="search-department" id="search-department" />
            </div>

            <div className="grid gap-4 py-5">
                {query.length === 0 ? departments.slice(initial, end).map((dept, index) => (
                    <DepartmentCard key={index + 1} data={dept} />
                )) : departments.filter(dept => {
                    const searchTerms = `${dept.department} ${dept.hod}`.toLowerCase();
                    return searchTerms.includes(query.toLowerCase())
                }).map((dept, index) => <DepartmentCard key={index + 1} data={dept} />)}
            </div>
            <div className="flex self-center px-10 justify-between gap-5 ">
                <button className="cursor-pointer"
                    onClick={previousPage}>Previous</button>
                <button className="cursor-pointer"
                    onClick={() => { setPageNumber(prev => 1) }}>1</button>
                <span className="border w-[30px] flex justify-center">{pageNumber}</span>
                <button className="cursor-pointer"
                    onClick={() => { setPageNumber(prev => maxPages) }}>{maxPages}</button>
                <button className="cursor-pointer"
                    onClick={nextPage}>Next</button>
            </div>
        </section>
    );
}