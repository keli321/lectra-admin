import { useState } from "react";
import Dashboardlayout from "../layout/DashboardLayout";
import TimetableTable from "../components/TimetableTable";
import AddClassForm from "../components/AddClassForm";
import EditClassModal from "../components/EditClassModal";
import DeleteClassModal from "../components/DeleteClassModal";
import WeeklyGrid from "../components/WeeklyGrid";

const Timetable = () =>  {
  //dummy timetable data
  const [classes] = useState([
    {
      id: 1,
      course: "COM211",
      day: "Monday",
      time: "08AM - 10AM",
      venue: "New Building",
      week: "Week 1",
    },
    {
      id: 2,
      course: "COM212",
      day: "Tuesday",
      time: "08AM - 10AM",
      venue: "ETF Building",
      week: "Week 2",
    },
        {
      id: 3,
      course: "COM215",
      day: "Thursday",
      time: "10AM - 12PM",
      venue: "New Building",
      week: "Week 3",
    },
  ]);

  const [activeModal, setActiveModal] = useState(null); //null for add, edit, delete
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <Dashboardlayout>

      <div className="timetable-page">

        <div className="page-header">
          <div>
          <h1>Timetable Management</h1>
          <p>Manages Timetable Schedules.</p>
          </div>
            <button onClick={() => setActiveModal('add')}>
              + Add class
            </button>
          </div>

        <div className="filters">
          <select><option>All Departments</option></select>
          <select><option>All  Weeks</option></select>
          <select><option>All Days</option></select>
        </div>

        <TimetableTable classes={classes} 
          onEditClick={(cls) => {
            setSelectedClass(cls);
            setActiveModal('edit');
          }}
          onDeleteClick={(cls) => {
            setSelectedClass(cls);
            setActiveModal('delete');
          }}
        /> 

        <AddClassForm
          isOpen={activeModal === 'add'}
          onClose={() => setActiveModal(null)}
         />

        <EditClassModal 
          selectedClass={selectedClass}
          isOpen={activeModal === 'edit'}
          onClose={() => setActiveModal(null)}       
        />
        

        <DeleteClassModal
          selectedClass={selectedClass}
          isOpen={activeModal === 'delete'}
          onClose={() => setActiveModal(null)}        
        />

        <WeeklyGrid />

      </div>

    </Dashboardlayout>
  )
};
export default Timetable;