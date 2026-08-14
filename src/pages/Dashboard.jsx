import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashCard from "../components/DashCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../components/Table.jsx"
import { BookOpen, CalendarClock, FileBracesCorner, Megaphone, UserPlus } from "lucide-react";
import { getAnnouncements } from "../api/announcements.js";
import { testData, tableData } from "../utils/testData.js";
import { checkDateFormat } from "../utils/functions.js";

function Ann({ data, isRead, onMarkAsRead }) {
    return (
        <Link to={`/announcements/${data.id}`} onClick={() => onMarkAsRead(data.id)}
            className="flex justify-between items-center gap-4 p-3.5 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {!isRead && (
                    <div className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </div>
                )}
                <span className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors duration-150">
                    {data.title}
                </span>
            </div>
            <span className="text-xs font-medium text-slate-400 whitespace-nowrap shrink-0">{data.timeCreated}</span>
        </Link>
    )
}

function QuickAction({ link, children, text }) {
    return (
        <Link to={link} className="flex flex-1 flex-col items-center">
            <div className="bg-violet-300 p-2 rounded-xl">
                {children}
            </div>
            <span className="text-[10px]">{text}</span>
        </Link>
    )
}


export default function Dashboard() {

    // ==========================================
    // STATES & VARIABLES =======================
    // ==========================================

    const navigate = useNavigate();
    const todaysCourses = tableData.filter(data => data.date === checkDateFormat()).slice(0, 5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [announcements, setAnnouncements] = useState([]);
    const [readAnnouncements, setReadAnnouncements] = useState(() => {
        const saved = localStorage.getItem("read_announcements");
        return saved ? JSON.parse(saved) : [];
    });
    const headArray = Array("Date", "Time", "Course", "Venue", "Department");


    // ==========================================
    // USE-EFFECT & FUNCTIONS ===================
    // ==========================================

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        setLoading(true);
        setError("");
        try {
            const [announcement] = await Promise.all([getAnnouncements()])
            setAnnouncements(announcement)
        } catch (error) {
            setError("Couldn't load data. Check your internet connection and try again.")
        } finally {
            setLoading(false)
        }
    }

    function handleMarkAsRead(id) {
        if (!readAnnouncements.includes(id)) {
            const updatedRead = [...readAnnouncements, id];
            setReadAnnouncements(updatedRead);
            localStorage.setItem("read_announcements", JSON.stringify(updatedRead));
        }
    };

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
                                value={data.number} icon={data.icon} text={"Just Random Values"} />
                        ))}
                    </div>
                    <div className="grid gap-6 grid-cols-1 xl:grid-cols-5">{/* STILL DON'T KNOW WHY WE'RE USING TAILWIND JUST MAKING DEBUGGING HARDER */}
                        <div className="items-center flex-1 rounded-2xl shadow-[0_0_5px_1px_rgb(173,149,149)] px-2 w-full xl:col-span-3 h-fit pb-5">
                            <div className="flex h-[10%] items-center justify-between gap-6 sm:gap-0 py-3 text-1rem md:text-[] font-medium my-1 w-full">
                                <div className="flex items-center gap-2">
                                    <CalendarClock className="text-blue-600" />
                                    <span>Today's Timetable</span>
                                </div>
                                <button className="cursor-pointer bg-transparent text-[0.7em] rgb(0, 0, 0) text-blue-600"
                                    onClick={() => navigate("/timetable")}>
                                    View Full Timetable &gt;
                                </button>
                            </div>
                            <div className="space-y-3 sm:hidden pb-4">
                                {todaysCourses.length ? (todaysCourses.map((course, index) => (
                                    <div key={index} className="rounded-xl border p-4 shadow-sm bg-white">
                                        <h3 className="font-semibold">{course.course}</h3>
                                        <div className="mt-2 text-sm text-gray-500 space-y-1">
                                            <p>{course.date}</p>
                                            <p>{course.time}</p>
                                            <p>{course.venue}</p>
                                            <p>{course.department}</p>
                                        </div>
                                    </div>
                                ))
                                ) : (
                                    <p>No courses today.</p>
                                )}
                            </div>
                            <div className="hidden sm:block overflow-x-auto">
                                <Table headArray={headArray}
                                    className="bg-gray-100 text-left text-sm text-gray-600">
                                    {todaysCourses.length ? (todaysCourses.map((data, index) => (
                                        <tr className="border-t text-sm" key={index}>
                                            <td className="p-3">{data.date}</td>
                                            <td className="p-3">{data.time}</td>
                                            <td className="p-3">{data.course}</td>
                                            <td className="p-3">{data.venue}</td>
                                            <td className="p-3">{data.department}</td>
                                        </tr>
                                    ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-4 text-center text-gray-500">
                                                No courses for today
                                            </td>
                                        </tr>
                                    )}
                                </Table>
                                <div />
                            </div>
                        </div>
                        <div className="grid grid-rows-7 gap-4 flex-1 rounded-2xl xl:col-span-2">
                            <div className="flex flex-col row-span-5 bg-white rounded-xl">
                                <div className="px-2 flex justify-between items-center mt-auto">
                                    <span className="font-semibold">Recent Announcements</span>
                                    <button className="text-blue-600 text-sm cursor-pointer"
                                        onClick={() => navigate("/announcements")}>View All</button>
                                </div>
                                <div className="h-[90%] mt-auto grid gap-2 px-2 pb-4">
                                    {announcements ?
                                        announcements.slice(0, 5).map(ann => (
                                            <Ann key={ann.id} data={ann} onMarkAsRead={handleMarkAsRead}
                                                isRead={readAnnouncements.includes(ann.id)} />
                                        )) : <div className="place-self-center">No announcements yet</div>
                                    }
                                </div>
                            </div>
                            <div className="row-span-2 bg-white rounded-xl p-4">
                                <span className="font-semibold pl-2">Quick Actions</span>
                                <div className="flex mt-4 text-center">
                                    <QuickAction link={"/announcements"} text={"Add Announcements"}>
                                        <Megaphone />
                                    </QuickAction>
                                    <QuickAction link={"/users"} text={"Add User"}>
                                        <UserPlus />
                                    </QuickAction>
                                    <QuickAction link={"/courses"} text={"Add Course"}>
                                        <BookOpen />
                                    </QuickAction>
                                    <QuickAction text={"View Report"}>
                                        <FileBracesCorner />
                                    </QuickAction>
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