import { useState } from "react";
import { tableData, testData } from "../utils/testData";
import Table from "../components/Table";
import Top from "../components/Top";
import Pagination from "../components/Pagination";


function Timetable() {

    // ============================================================================================
    //STATES & VARIABLES ==========================================================================
    // ============================================================================================

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [toast, setToast] = useState(null);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [editingDept, setEditingDept] = useState(null); // null = add mode
    const [form, setForm] = useState({
        name: "",
        school: "",
        hod: "",
        email: "",
        phone: ""
    });
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const headArray = ["Date", "Time", "Course", "Venue", "Department", "Actions"]

    const heightDet = window.innerHeight < 1000 ? 10 : window.innerHeight < 1500 ? 15 : 20
    const [pageNumber, setPageNumber] = useState(1);
    const [thisEnd, setThisEnd] = useState(heightDet);

    const MAX_PAGES = Math.ceil(tableData.length / thisEnd);
    const initial = (pageNumber - 1) * thisEnd;
    const end = ((initial + thisEnd) > tableData.length) ? (tableData.length) : (initial + thisEnd);


    // ============================================================================================
    //USE-EFFECTS & FUNCTIONS =====================================================================
    // ============================================================================================

    function addPage() {
        setPageNumber(prev => {
            if (prev === MAX_PAGES) return prev;
            return prev + 1
        })
    }
    function reducePage() {
        setPageNumber(prev => {
            if (prev === 1) return 1;
            return prev - 1
        })
    }

    return (
        <section className="">
            <Top name={"Timetable"} />
            <Table headArray={headArray} className="bg-gray-100 text-left text-sm text-gray-600">
                {tableData.sort((a, b) => new Date(a.date) - new Date(b.date))
                    .slice(initial, end).map(data => (
                        <tr className="border-t text-sm">
                            <td className="p-3">{data.date}</td>
                            <td className="p-3">{data.time}</td>
                            <td className="p-3">{data.course}</td>
                            <td className="p-3">{data.venue}</td>
                            <td className="p-3">{data.department}</td>
                            <td className="p-3 flex gap-2">ok</td>
                        </tr>
                    ))}
            </Table>
            {<Pagination start={initial + 1} howMany={tableData.length} end={end} goToPage={(e) => setPageNumber(prev => Number(e.target.innerText))} reducePage={reducePage} addPage={addPage}
                currentPage={pageNumber} lastPage={MAX_PAGES} setThisEnd={(e) => setThisEnd(prev => Number(e.target.value))} />}
        </section>
    );
}

export default Timetable;