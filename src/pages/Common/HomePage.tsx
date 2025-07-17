
import Navbar from "../../components/Navbar";
import AdminDashboard from "../Admin/AdminDashboard";
import EmployeeDashboard from "../Employee/EmployeeDashboard";
import HRDashboard from "../HR/HRDashboard";
import ManagerDashboard from "../Manager/ManagerDashboard";


const HomePage = () => {
  const role = localStorage.getItem('role') || "Employee"; // Default to Employee if no role is set
  const selectedDashboard = (role: string) => {
    switch (role) {
      case "Admin":
        return <AdminDashboard />;
      case "HR":
        return <EmployeeDashboard />;
      case "Manager":
        return <EmployeeDashboard />;
      case "Employee":
        return <EmployeeDashboard />;
      default:
        return <EmployeeDashboard />;
    }
  };

  return (
    <>
      <div className="flex h-full ">
        <Navbar />
        <div className=" w-screen">
          {selectedDashboard(role)}
        </div>

      </div>

    </>
  )
}

export default HomePage;