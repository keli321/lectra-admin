import DashCard from "../components/DashCard/DashCard.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { testData, tableData } from "../utils/testData.js";
import { checkDateFormat } from "../utils/functions.js";

export default function Dashboard() {
    return (
        <section>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 p-4 items-center lg:grid-cols-6" /* className="sm:grid grid-cols-6 sm:gap-4 p-4" */>
                {testData.map((data, index) => (
                    <Link
  key={index}
  to={data.path}
  className={index < 3 ? "col-span-1 lg:col-span-2" : "col-span-1 lg:col-span-3"}
>
  <DashCard
    heading={data.name}
    number={data.number}
    note={data.note}
    headerIcon={data.icon}
  />
</Link>
                ))}
            </div>
            <div className="flex flex-col h-80 gap-4">
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

                    <table className="w-full">
                        <thead className="bg-blue">
                            <tr className="flex justify-between px-2 text-left">
                                <th>Date</th>
                                <th>Time</th>
                                <th>Course</th>
                                <th>Venue</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* TO THE PERSON THAT MIGHT PRESENT THIS, THIS PART BELOW IS JUST TO FILTER THE TIMETABLE DATA ACCORDING TO WHAT checkDateFormat() RETURNS AND THEN RETURN THE FIRST 5 ELEMENTS IN IT*/}
                            {tableData.filter(data => data.date === checkDateFormat()).slice(0, 5).map((data, index) => (
                                <tr className="flex justify-between" key={index}>
                                    <td className="py-2">{data.date}</td>
                                    <td className="py-2">{data.time}</td>
                                    <td className="py-2">{data.course}</td>
                                    <td className="py-2">{data.venue}</td>
                                    <td className="py-2">{data.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="h-full flex-1 rounded-2xl border border-red-500"></div>
            </div>
        </section>
    );
}