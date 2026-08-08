import {
    faBell,
    faBookOpen,
    faCalendarDay,
    faChalkboardTeacher,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";


export const testData = [
    {
        name: "Total Students",
        number: 1245,
        change: 35,
        icon: faUsers
    },
    {
        name: "Total Lecturers",
        number: 87,
        change: 4,
        icon: faChalkboardTeacher
    },
    {
        name: "Total Courses",
        number: 53,
        change: 2,
        icon: faBookOpen
    },
    {
        name: "Classes Today",
        number: 12,
        icon: faCalendarDay
    },
    {
        name: "Active Notifications",
        number: 4,
        icon: faBell
    }
]

export const tableData = [
    { date: "2026-08-06", time: "08:00AM", course: "MTH 101", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-06", time: "10:00AM", course: "COM 051", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-06", time: "12:00PM", course: "COM 054", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-06", time: "02:00PM", course: "COM 059", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-06", time: "04:00PM", course: "COM 111", venue: "NB Room 1", department: "Computer Science" },
    { date: "2026-08-06", time: "10:00AM", course: "STA 112", venue: "NB Room 1", department: "Statistics" },
    { date: "2026-08-04", time: "12:00PM", course: "COM 052", venue: "Lab 3", department: "Computer Science" },
    { date: "2026-08-04", time: "02:00PM", course: "GNS 101", venue: "Main Auditorium", department: "General Studies" },
    { date: "2026-08-05", time: "04:00PM", course: "COM 055", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-05", time: "08:00AM", course: "MTH 201", venue: "NB Room 3", department: "Mathematics" },
    { date: "2026-08-05", time: "10:00AM", course: "COM 113", venue: "Lab 1", department: "Computer Science" },
    { date: "2026-08-05", time: "12:00PM", course: "STA 051", venue: "NB Room 1", department: "Statistics" },
    { date: "2026-08-22", time: "02:00PM", course: "COM 056", venue: "NB Room 4", department: "Computer Science" },
    { date: "2026-08-22", time: "04:00PM", course: "GNS 202", venue: "Main Auditorium", department: "General Studies" },
    { date: "2026-08-22", time: "08:00AM", course: "COM 115", venue: "Lab 2", department: "Computer Science" },
    { date: "2026-08-22", time: "10:00AM", course: "MTH 102", venue: "NB Room 2", department: "Mathematics" },
    { date: "2026-08-23", time: "12:00PM", course: "COM 058", venue: "Lab 3", department: "Computer Science" },
    { date: "2026-08-23", time: "02:00PM", course: "EET 111", venue: "Electronics Lab", department: "Electrical Engineering" },
    { date: "2026-08-23", time: "04:00PM", course: "COM 112", venue: "NB Room 1", department: "Computer Science" },
    { date: "2026-08-23", time: "08:00AM", course: "COM 205", venue: "Lab 2", department: "Computer Science" },
    { date: "2026-08-19", time: "04:00PM", course: "COM 311", venue: "Lab 4", department: "Computer Science" },
    { date: "2026-08-19", time: "08:00AM", course: "PHY 111", venue: "Physics Lab", department: "Science Laboratory Technology" },
    { date: "2026-08-04", time: "10:00AM", course: "COM 312", venue: "NB Room 3", department: "Computer Science" },
    { date: "2026-08-04", time: "12:00PM", course: "MTH 052", venue: "NB Room 4", department: "Mathematics" },
    { date: "2026-08-04", time: "04:00PM", course: "COM 411", venue: "Lab 1", department: "Computer Science" },
    { date: "2026-08-05", time: "08:00AM", course: "CHM 111", venue: "Chemistry Lab", department: "Science Laboratory Technology" },
    { date: "2026-08-05", time: "10:00AM", course: "COM 315", venue: "Lab 4", department: "Computer Science" },
    { date: "2026-08-05", time: "02:00PM", course: "BAM 111", venue: "Management Hall", department: "Business Administration" },
    { date: "2026-08-22", time: "10:00AM", course: "COM 413", venue: "Lab 2", department: "Computer Science" },
    { date: "2026-08-22", time: "12:00PM", course: "STA 311", venue: "NB Room 3", department: "Statistics" },
    { date: "2026-08-22", time: "02:00PM", course: "COM 317", venue: "NB Room 1", department: "Computer Science" },
    { date: "2026-08-23", time: "08:00AM", course: "ACC 111", venue: "Management Hall", department: "Accountancy" },
    { date: "2026-08-23", time: "10:00AM", course: "COM 415", venue: "Lab 4", department: "Computer Science" },
    { date: "2026-08-26", time: "08:00AM", course: "COM 305", venue: "Lab 1", department: "Computer Science" },
    { date: "2026-08-26", time: "10:00AM", course: "MTH 301", venue: "NB Room 2", department: "Mathematics" },
    { date: "2026-08-26", time: "12:00PM", course: "COM 422", venue: "Lab 3", department: "Computer Science" },
    { date: "2026-08-27", time: "08:00AM", course: "STA 314", venue: "NB Room 4", department: "Statistics" },
    { date: "2026-08-27", time: "10:00AM", course: "COM 325", venue: "Lab 2", department: "Computer Science" },
    { date: "2026-08-27", time: "02:00PM", course: "GNS 301", venue: "Main Auditorium", department: "General Studies" },
    { date: "2026-08-27", time: "04:00PM", course: "COM 426", venue: "Lab 4", department: "Computer Science" },
    { date: "2026-08-19", time: "02:00PM", course: "COM 059", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-04", time: "08:00AM", course: "COM 111", venue: "Lab 1", department: "Computer Science" },
    { date: "2026-08-04", time: "10:00AM", course: "STA 112", venue: "NB Room 1", department: "Statistics" },
    { date: "2026-08-04", time: "12:00PM", course: "COM 052", venue: "Lab 3", department: "Computer Science" },
    { date: "2026-08-04", time: "02:00PM", course: "GNS 101", venue: "Main Auditorium", department: "General Studies" },
]