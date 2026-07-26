import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Courses from "../pages/Courses";
import Timetable from "../pages/Timetable";
import Users from "../pages/Users";
import Notifications from "../pages/Notifications";
import Announcements from "../pages/Announcements";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
      { path: "users", element: <Users /> },
      { path: "departments", element: <Departments /> },
      { path: "courses", element: <Courses /> },
      { path: "timetable", element: <Timetable /> },
      { path: "notifications", element: <Notifications /> },
      { path: "announcements", element: <Announcements /> },
    ],
  },
]);