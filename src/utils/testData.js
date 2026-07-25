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