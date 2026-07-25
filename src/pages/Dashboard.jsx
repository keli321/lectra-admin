import DashCard from "../components/DashCard/DashCard.jsx";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { testData } from "../utils/testData.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard() {
    return (
        <section>
            <div className="grid gap-4 grid-cols-2 p-4 items-center lg:grid-cols-6" /* className="sm:grid grid-cols-6 sm:gap-4 p-4" */>
                {testData.map((data, index) => (
                    <div key={index} className={index < 3 ? "col-span-1 lg:col-span-2" : "col-span-1 lg:col-span-3"} >
                        <DashCard heading={data.name} smallText={data.change} color={data.color}
                            number={data.number} trend={data.trend} note={data.note} headerIcon={data.icon} />
                    </div>
                ))}
            </div>
            <div className="sm:flex h-80 gap-4 px-2">
                <div className="h-full flex-1 rounded-2xl">
                    <div className="flex h-[10%] items-center justify-between px-4 text-[1.2rem] font-medium">
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCalendarDay} className="text-blue-600" />
                            <span>Today's Timetable</span>
                        </div>

                        <button className="cursor-pointer bg-transparent text-[0.7em]">
                            View Full Timetable &gt;
                        </button>
                    </div>

                    <table className="w-full">
                        <thead>
                            <tr className="flex justify-between px-4">
                                <td>Time</td>
                                <td>Course</td>
                                <td>Lecturer</td>
                                <td>Venue</td>
                                <td>Department</td>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="h-full flex-1 rounded-2xl border border-red-500"></div>
            </div>
        </section>
    );
}