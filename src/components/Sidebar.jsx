function Sidebar() {
  return (
    <div style={{ width: "200px", background: "#111", color: "white", padding: "20px" }}>
      <h2>LECTRA</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Dashboard</li>
        <li>Users</li>
        <li>Departments</li>
        <li>Courses</li>
        <li>Timetable</li>
        <li>Notifications</li>
        <li>Announcements</li>
      </ul>
    </div>
  );
}

export default Sidebar;