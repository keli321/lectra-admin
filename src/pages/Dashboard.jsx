import DashCard from "../components/DashCard.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faBullhorn, faCalendarDay, faChartColumn, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getAnnouncements } from "../api/announcements.js";
import { testData, tableData } from "../utils/testData.js";
import { checkDateFormat } from "../utils/functions.js";
import { useEffect, useState } from "react";

function Ann({ data }) {
  
    return (
        <div className="flex justify-between items-center gap-4 p-3.5 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </div>
                <span className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors duration-150">
                    {data.title}
                </span>
            </div>
            <span className="text-xs font-medium text-slate-400 whitespace-nowrap shrink-0">{data.timeCreated}</span>
        </div>
    )
}


export default function Dashboard() {

    const todaysCourses = tableData.filter(data => data.date === checkDateFormat()).slice(0, 5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [announcements, setAnnouncements] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        setLoading(true);
        setError("");
        try {
            const [announcement] = await Promise.all([getAnnouncements()])
            console.log(announcement);
            setAnnouncements(announcement)
        } catch (error) {
            setError("Couldn't load data. Check your internet connection and try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="flex flex-col gap-4">
            {loading ? (
                <div className="text-center py-10 text-gray-500">Loading the dashboard...</div>
            ) : error ? (
                <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
                <>
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
                        {testData.map((data, index) => (
                            <DashCard key={index} title={data.name} change={data.change}
                                value={data.number} icon={data.icon} />
                        ))}
                    </div>
                    <div className="grid gap-6 xl:grid-cols-5 min-h-[60%]">
                        <div className="place-self-center items-center flex-1 rounded-2xl shadow-[0_0_5px_1px_rgb(173,149,149)] px-10 xl:col-span-3 h-full">
                            <div className="flex h-[10%] items-center justify-between px-1 py-3 text-1rem md:text-[] font-medium my-1">
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCalendarDay} className="text-blue-600" />
                                    <span>Today's Timetable</span>
                                </div>
                                <Link to={"/timetable"}>
                                    <button className="cursor-pointer bg-transparent text-[0.7em] text-blue-600">
                                        View Full Timetable &gt;
                                    </button>
                                </Link>
                            </div>
                            <div className="overflow-x-auto xl:mt-8">
                                <table className="w-full border-collapse shadow-sm rounded overflow-hidden">
                                    <thead>
                                        <tr className="grid grid-cols-5 px-2 text-left bg-gray-100 text-sm text-gray-600">
                                            <th className="py-3">Date</th>
                                            <th className="py-3">Time</th>
                                            <th className="py-3">Course</th>
                                            <th className="py-3">Venue</th>
                                            <th className="py-3">Department</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {todaysCourses.length ? (todaysCourses.map((data, index) => (
                                            <tr className="grid grid-cols-5 border-t text-sm items-center" key={index}>
                                                <td className="py-2">{data.date}</td>
                                                <td className="py-2">{data.time}</td>
                                                <td className="py-2">{data.course}</td>
                                                <td className="py-2">{data.venue}</td>
                                                <td className="py-2">{data.department}</td>
                                            </tr>
                                        ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-4 text-center text-gray-500">
                                                    No courses for today
                                                </td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>
                                <div />
                            </div>
                        </div>
                        <div className="grid grid-rows-7 gap-4 flex-1 rounded-2xl xl:col-span-2">
                            <div className="flex flex-col row-span-5 bg-white rounded-xl">
                                <div className="px-2 flex justify-between items-center mt-auto">
                                    <span className="font-semibold">Recent Announcements</span>
                                    <Link to="/announcements" className="text-blue-600 text-sm">View All</Link>
                                </div>
                                <div className="h-[90%] mt-auto grid gap-2">
                                    {announcements.slice(0, 5).map(map => <Ann data={map} />)}
                                </div>
                            </div>
                            <div className="row-span-2 bg-white rounded-xl p-4">
                                <span className="font-semibold pl-2">Quick Actions</span>
                                <div className="flex mt-4 text-center">
                                    <Link to="/announcements" className="flex flex-1 flex-col items-center">
                                        <div className="bg-violet-300 p-2 rounded-xl">
                                            <FontAwesomeIcon icon={faBullhorn} />
                                        </div>
                                        <span className="text-[10px]">Add Announcement</span>
                                    </Link>
                                    <div className="flex flex-1 flex-col items-center">
                                        <div className="bg-violet-300 p-2 rounded-xl">
                                            <FontAwesomeIcon icon={faUserPlus} />
                                        </div>
                                        <span className="text-[10px]">Add User</span>
                                    </div>
                                    <div className="flex flex-1 flex-col items-center">
                                        <div className="bg-violet-300 p-2 rounded-xl">
                                            <FontAwesomeIcon icon={faBookOpen} />
                                        </div>
                                        <span className="text-[10px]">Add Course</span>
                                    </div>
                                    <div className="flex flex-1 flex-col items-center">
                                        <div className="bg-violet-300 p-2 rounded-xl">
                                            <FontAwesomeIcon icon={faChartColumn} />
                                        </div>
                                        <span className="text-[10px]">View Report</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border h-40"></div>
                </>
            )}
        </section>
    );
}