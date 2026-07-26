import { faSpeakap, faSpeakerDeck } from "@fortawesome/free-brands-svg-icons";
import { faArrowTrendUp, faBookOpen, faCalendar, faCalendarDay, faCalendarDays, faUsers } from "@fortawesome/free-solid-svg-icons";

export const testData = [
    {
        name: "Total Students",
        number: 1245,
        change: 35,
        icon: faUsers,
        color: "rgb(10, 25, 230)",
        trend: faArrowTrendUp
    },
    {
        name: "Total Lecturers",
        number: 87,
        change: 4,
        icon: faSpeakap,
        color: "rgba(48, 212, 16, 0.82)",
        trend: faArrowTrendUp
    },
    {
        name: "Total Courses",
        number: 53,
        change: 2,
        icon: faBookOpen,
        color: "rgb(160, 10, 230)",
        trend: faArrowTrendUp
    },
    {
        name: "Classes Today",
        number: 12,
        icon: faCalendarDay,
        color: "rgb(230, 190, 10)",
        note: "Across all departments"
    },
    {
        name: "Active Notifications",
        number: 4,
        icon: faUsers,
        color: "rgb(230, 10, 131)",
        note: "Require your attention"
    }
]

export const tableData = [
    {
        date: "2026-10-19",
        time: "08:00AM",
        course: "MTH 101",
        venue: "NB Room 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-19",
        time: "10:00AM",
        course: "COM 211",
        venue: "NB Room 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-19",
        time: "12:00PM",
        course: "COM 214",
        venue: "NB Room 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-19",
        time: "02:00PM",
        course: "COM 219",
        venue: "NB Room 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-20",
        time: "08:00AM",
        course: "COM 111",
        venue: "Lab 1",
        department: "Computer Science"
    },
    {
        date: "2026-10-20",
        time: "10:00AM",
        course: "STA 112",
        venue: "NB Room 1",
        department: "Statistics"
    },
    {
        date: "2026-10-20",
        time: "12:00PM",
        course: "COM 212",
        venue: "Lab 3",
        department: "Computer Science"
    },
    {
        date: "2026-10-20",
        time: "02:00PM",
        course: "GNS 101",
        venue: "Main Auditorium",
        department: "General Studies"
    },
    {
        date: "2026-10-21",
        time: "04:00PM",
        course: "COM 215",
        venue: "NB Room 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-21",
        time: "08:00AM",
        course: "MTH 201",
        venue: "NB Room 3",
        department: "Mathematics"
    },
    {
        date: "2026-10-21",
        time: "10:00AM",
        course: "COM 113",
        venue: "Lab 1",
        department: "Computer Science"
    },
    {
        date: "2026-10-21",
        time: "12:00PM",
        course: "STA 211",
        venue: "NB Room 1",
        department: "Statistics"
    },
    {
        date: "2026-10-22",
        time: "02:00PM",
        course: "COM 216",
        venue: "NB Room 4",
        department: "Computer Science"
    },
    {
        date: "2026-10-22",
        time: "04:00PM",
        course: "GNS 202",
        venue: "Main Auditorium",
        department: "General Studies"
    },
    {
        date: "2026-10-22",
        time: "08:00AM",
        course: "COM 115",
        venue: "Lab 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-22",
        time: "10:00AM",
        course: "MTH 102",
        venue: "NB Room 2",
        department: "Mathematics"
    },
    {
        date: "2026-10-23",
        time: "12:00PM",
        course: "COM 218",
        venue: "Lab 3",
        department: "Computer Science"
    },
    {
        date: "2026-10-23",
        time: "02:00PM",
        course: "EET 111",
        venue: "Electronics Lab",
        department: "Electrical Engineering"
    },
    {
        date: "2026-10-23",
        time: "04:00PM",
        course: "COM 112",
        venue: "NB Room 1",
        department: "Computer Science"
    },
    {
        date: "2026-10-23",
        time: "08:00AM",
        course: "COM 221",
        venue: "Lab 2",
        department: "Computer Science"
    },
    // --- 20 New Additions Below ---
    {
        date: "2026-10-19",
        time: "04:00PM",
        course: "COM 311",
        venue: "Lab 4",
        department: "Computer Science"
    },
    {
        date: "2026-10-19",
        time: "08:00AM",
        course: "PHY 111",
        venue: "Physics Lab",
        department: "Science Laboratory Technology"
    },
    {
        date: "2026-10-20",
        time: "10:00AM",
        course: "COM 312",
        venue: "NB Room 3",
        department: "Computer Science"
    },
    {
        date: "2026-10-20",
        time: "12:00PM",
        course: "MTH 212",
        venue: "NB Room 4",
        department: "Mathematics"
    },
    {
        date: "2026-10-20",
        time: "04:00PM",
        course: "COM 411",
        venue: "Lab 1",
        department: "Computer Science"
    },
    {
        date: "2026-10-21",
        time: "08:00AM",
        course: "CHM 111",
        venue: "Chemistry Lab",
        department: "Science Laboratory Technology"
    },
    {
        date: "2026-10-21",
        time: "10:00AM",
        course: "COM 315",
        venue: "Lab 4",
        department: "Computer Science"
    },
    {
        date: "2026-10-21",
        time: "02:00PM",
        course: "BAM 111",
        venue: "Management Hall",
        department: "Business Administration"
    },
    {
        date: "2026-10-22",
        time: "10:00AM",
        course: "COM 413",
        venue: "Lab 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-22",
        time: "12:00PM",
        course: "STA 311",
        venue: "NB Room 3",
        department: "Statistics"
    },
    {
        date: "2026-10-22",
        time: "02:00PM",
        course: "COM 317",
        venue: "NB Room 1",
        department: "Computer Science"
    },
    {
        date: "2026-10-23",
        time: "08:00AM",
        course: "ACC 111",
        venue: "Management Hall",
        department: "Accountancy"
    },
    {
        date: "2026-10-23",
        time: "10:00AM",
        course: "COM 415",
        venue: "Lab 4",
        department: "Computer Science"
    },
    {
        date: "2026-10-26", // Next Monday
        time: "08:00AM",
        course: "COM 321",
        venue: "Lab 1",
        department: "Computer Science"
    },
    {
        date: "2026-10-26",
        time: "10:00AM",
        course: "MTH 301",
        venue: "NB Room 2",
        department: "Mathematics"
    },
    {
        date: "2026-10-26",
        time: "12:00PM",
        course: "COM 422",
        venue: "Lab 3",
        department: "Computer Science"
    },
    {
        date: "2026-10-27", // Next Tuesday
        time: "08:00AM",
        course: "STA 314",
        venue: "NB Room 4",
        department: "Statistics"
    },
    {
        date: "2026-10-27",
        time: "10:00AM",
        course: "COM 325",
        venue: "Lab 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-27",
        time: "02:00PM",
        course: "GNS 301",
        venue: "Main Auditorium",
        department: "General Studies"
    },
    {
        date: "2026-10-27",
        time: "04:00PM",
        course: "COM 426",
        venue: "Lab 4",
        department: "Computer Science"
    },
    {
        date: "2026-10-19",
        time: "02:00PM",
        course: "COM 219",
        venue: "NB Room 2",
        department: "Computer Science"
    },
    {
        date: "2026-10-20",
        time: "08:00AM",
        course: "COM 111",
        venue: "Lab 1",
        department: "Computer Science"
    },
    {
        date: "2026-10-20",
        time: "10:00AM",
        course: "STA 112",
        venue: "NB Room 1",
        department: "Statistics"
    },
    {
        date: "2026-10-20",
        time: "12:00PM",
        course: "COM 212",
        venue: "Lab 3",
        department: "Computer Science"
    },
    {
        date: "2026-10-20",
        time: "02:00PM",
        course: "GNS 101",
        venue: "Main Auditorium",
        department: "General Studies"
    },
];
