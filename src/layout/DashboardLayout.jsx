import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";  
import "./layout.css";

const DashboardLayout = ({ children }) => {

  return(
    <div  className="dashboard-layout">

      <Sidebar />

      <div className="main-content">

        <Header />

        {children}

      </div>
      
    </div>
  );
};
export default DashboardLayout;