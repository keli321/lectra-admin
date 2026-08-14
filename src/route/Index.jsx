import { createBrowserRouter } from "react-router-dom";


import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import OtpVerification from "../pages/OtpVerification";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import FaceVerification from "../pages/FaceVerification";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Courses from "../pages/Courses";
import Timetable from "../pages/Timetable";
import Users from "../pages/Users";
import Notifications from "../pages/Notifications";
import Announcements from "../pages/Announcements";
import Announcement from "../pages/Announcement";
import NotFound from "../pages/NotFound";
import Otp from "../pages/Otp";
import ResetPassword from "../pages/ResetPassword";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/forgot-password", // WILL NEED APPROVAL
        element: <ForgotPassword />
    },
    {
        path: "/reset-password", // WILL NEED APPROVAL
        element: <ResetPassword />
    },
    {
        path: "/otp-verification", // WILL NEED APPROVAL
        element: <Otp />
    },
    {
        path: "/verify-otp",
        element: <OtpVerification />,
    },
    {
        path: "/face-verification",
        element: <FaceVerification />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Dashboard /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "change-password", element: <ChangePassword /> },
            { path: "users", element: <Users /> },
            { path: "departments", element: <Departments /> },
            { path: "courses", element: <Courses /> },
            { path: "timetable", element: <Timetable /> },
            { path: "notifications", element: <Notifications /> },
            { path: "announcements", element: <Announcements /> },
            { path: "announcements/:annId", element: <Announcement /> },
            { path: "*", element: <NotFound /> }
        ]
    }
]);