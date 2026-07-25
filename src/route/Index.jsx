import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout.jsx"
import Dashboard from "../pages/Dashboard.jsx";
import Departments from "../pages/Departments.jsx";
import Courses from "../pages/Courses.jsx";
import Timetable from "../pages/Timetable.jsx";
import Users from "../pages/Users.jsx";
import Notifications from "../pages/Notifications.jsx";
import Login from "../pages/Login.jsx";
import Announcements from "../pages/Announcements.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "users",
                element: <Users />,
            },
            {
                path: "departments",
                element: <Departments />,
            },
            {
                path: "courses",
                element: <Courses />,
            },
            {
                path: "timetable",
                element: <Timetable />,
            },
            {
                path: "notifications",
                element: <Notifications />,
            },
            {
                path: "announcements",
                element: <Announcements />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);