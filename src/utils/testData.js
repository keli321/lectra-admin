import {
    faArrowTrendUp,
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
        icon: faUsers,
        trend: faArrowTrendUp
    },
    {
        name: "Total Lecturers",
        number: 87,
        change: 4,
        icon: faChalkboardTeacher,
        trend: faArrowTrendUp
    },
    {
        name: "Total Courses",
        number: 53,
        change: 2,
        icon: faBookOpen,
        trend: faArrowTrendUp
    },
    {
        name: "Classes Today",
        number: 12,
        icon: faCalendarDay,
        note: "Across a departments"
    },
    {
        name: "Active Notifications",
        number: 4,
        icon: faUsers,
        note: "Require your attention"
    }
]

export const tableData = [
    { date: "2026-08-03", time: "08:00AM", course: "MTH 101", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-03", time: "10:00AM", course: "COM 051", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-03", time: "12:00PM", course: "COM 054", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-03", time: "02:00PM", course: "COM 059", venue: "NB Room 2", department: "Computer Science" },
    { date: "2026-08-03", time: "04:00PM", course: "COM 111", venue: "NB Room 1", department: "Computer Science" },
    { date: "2026-08-03", time: "10:00AM", course: "STA 112", venue: "NB Room 1", department: "Statistics" },
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

export const users = [
    { id: 1, name: "Johnny Davis", email: "johnnydavis@hotmail.com", role: "Admin", department: "Administration" },
    { id: 2, name: "Sarah Jenkins", email: "s.jenkins@gmail.com", role: "Dean", department: "College of Engineering" },
    { id: 3, name: "Michael Chang", email: "mchang@yahoo.com", role: "Professor", department: "Mathematics" },
    { id: 4, name: "Emily Rodriguez", email: "emily.r@outlook.com", role: "Associate Professor", department: "Biological Sciences" },
    { id: 5, name: "David Kim", email: "dkim@university.edu", role: "Academic Advisor", department: "Student Affairs" },
    { id: 6, name: "Jessica Taylor", email: "jtaylor@hotmail.com", role: "Registrar", department: "Enrollment Services" },
    { id: 7, name: "James Wilson", email: "jwilson@gmail.com", role: "Provost", department: "Academic Affairs" },
    { id: 8, name: "Amanda Martinez", email: "amartinez@outlook.com", role: "Assistant Professor", department: "English Literature" },
    { id: 9, name: "Robert Chen", email: "bchen@university.edu", role: "Researcher", department: "Computer Science" },
    { id: 10, name: "Lisa Anderson", email: "lisa.a@yahoo.com", role: "Department Chair", department: "History" },
    { id: 11, name: "William Thomas", email: "wthomas@gmail.com", role: "Lecturer", department: "Physics" },
    { id: 12, name: "Ashley Jackson", email: "ajackson@outlook.com", role: "Admissions Officer", department: "Enrollment Services" },
    { id: 13, name: "Brian White", email: "bwhite@university.edu", role: "Systems Administrator", department: "Campus IT" },
    { id: 14, name: "Megan Harris", email: "mharris@hotmail.com", role: "Adjunct Professor", department: "Business School" },
    { id: 15, name: "Kevin Martin", email: "kmartin@yahoo.com", role: "Athletic Director", department: "Campus Recreation" },
    { id: 16, name: "Rachel Clark", email: "rachel.c@gmail.com", role: "Lab Coordinator", department: "Chemistry" },
    { id: 17, name: "Jason Lewis", email: "jlewis@university.edu", role: "Financial Aid Counselor", department: "Student Finance" },
    { id: 18, name: "Stephanie Lee", email: "slee@outlook.com", role: "Librarian", department: "University Libraries" },
    { id: 19, name: "Daniel Walker", email: "dwalker@hotmail.com", role: "Graduate Assistant", department: "Psychology" },
    { id: 20, name: "Nicole Hall", email: "nhall@gmail.com", role: "Bursar", department: "Finance & Operations" }
]