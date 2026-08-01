import { useState } from "react";
import { tableData, testData } from "../utils/testData";


function Timetable() {

    const maxPages = Math.ceil(tableData.length / 20);
    const [pageNumber, setPageNumber] = useState(1);
    const initial = (pageNumber - 1) * 20;
    const end = initial + 20;

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
        <section className="">
            <table className="w-full text-left">
                <thead className="w-full bg-black text-[#FFF]">
                    <tr className="">
                        <th className="p-4">Date</th>
                        <th className="p-4">Time</th>
                        <th className="p-4">Course</th>
                        <th className="p-4">Venue</th>
                        <th className="p-4">Department</th>
                    </tr>
                </thead>
                <tbody className="w-full">
                    {tableData.sort((a, b) => new Date(a.date) - new Date(b.date))
                        .slice(initial, end).map(data => (
                            <tr className="">
                                <td className="p-4">{data.date}</td>
                                <td className="p-4">{data.time}</td>
                                <td className="p-4">{data.course}</td>
                                <td className="p-4">{data.venue}</td>
                                <td className="p-4">{data.department}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="h-10 flex items-center justify-between">
                Go to next page
                <span className="mx-5 flex gap-5 items-center">
                    <button className="bg-[gray] py-2 px-3 cursor-pointer rounded"
                        onClick={previousPage}>&lt;</button>
                    {pageNumber}
                    <button className="bg-[gray] py-2 px-3 cursor-pointer rounded"
                        onClick={nextPage}>&gt;</button>
                </span>
            </div>
        </section>
    );
}

export default Timetable;