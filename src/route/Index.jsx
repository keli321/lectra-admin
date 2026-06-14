import { createBrowserRouter } from "react-router-dom";


import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Courses from "../pages/Courses";
import Timetable from "../pages/Timetable";
import Users from "../pages/Users";
import Notifications from "../pages/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/departments",
    element: <Departments />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/timetable",
    element: <Timetable />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/announcements",
    element: <Announcements />,
  },
]);