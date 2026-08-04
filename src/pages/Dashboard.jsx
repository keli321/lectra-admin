import DashCard from "../components/DashCard.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { testData, tableData } from "../utils/testData.js";
import { checkDateFormat } from "../utils/functions.js";

export default function Dashboard() {
    return (
        <section className="flex flex-col gap-10">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {testData.map((data, index) => (
                    <DashCard key={index} title={data.name} change={data.change}
                        value={data.number} icon={data.icon} />
                ))}
            </div>
            <div className="flex-1 rounded-2xl shadow-[0_0_5px_1px_rgb(173,149,149)] px-10">
                <div className="flex h-[10%] items-center justify-between px-1 py-3 text-1rem md:text-[1.2rem] font-medium my-1">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendarDay} className="text-blue-600" />
                        <span>Today's Timetable</span>
                    </div>
                    <Link to={"/timetable"}>
                        <button className="cursor-pointer bg-transparent text-[0.7em]">
                            View Full Timetable &gt;
                        </button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-150">
                        <thead className="bg-blue">
                            <tr className="grid grid-cols-5 px-2 text-left">
                                <th>Date</th>
                                <th>Time</th>
                                <th>Course</th>
                                <th>Venue</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.filter(data => data.date === checkDateFormat()).slice(0, 5).map((data, index) => (
                                <tr className="grid grid-cols-5" key={index}>
                                    <td className="py-2">{data.date}</td>
                                    <td className="py-2">{data.time}</td>
                                    <td className="py-2">{data.course}</td>
                                    <td className="py-2">{data.venue}</td>
                                    <td className="py-2">{data.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div />
                </div>
            </div>
            <div className="h-full flex-1 rounded-2xl border border-red-500"></div>
        </section>
    );
}