
import Navbar from "../../components/Navbar";
import AdminDashboard from "../Admin/AdminDashboard";
import EmployeeDashboard from "../Employee/EmployeeDashboard";
import { useAuth } from "../../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  const role = user?.role || "Employee";

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
    <div className="flex h-full">
      <Navbar />
      <div className="w-screen">
        {selectedDashboard(role)}
      </div>
    </div>
  );
}

export default HomePage;