import { useState } from "react";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaUserShield,
  FaBuilding,
  FaClipboardList,
  FaCalendarCheck,
  FaSignOutAlt,
  FaBullhorn,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  {
    path: "/home",
    icon: <FaHome />,
    label: "Dashboard",
    roles: ["Admin", "HR", "Manager", "Employee"],
  },
  {
    path: "/profile",
    icon: <FaUser />,
    label: "Profile",
    roles: ["Admin", "HR", "Manager", "Employee"],
  },
  {
    path: "/users",
    icon: <FaUsers />,
    label: "Employee Management",
    roles: ["Admin"],
  },
  {
    path: "/roles",
    icon: <FaUserShield />,
    label: "Role Management",
    roles: ["Admin"],
  },
  {
    path: "/departments",
    icon: <FaBuilding />,
    label: "Departments",
    roles: ["Admin", "HR"],
  },
  {
    path: "/leave-requests",
    icon: <FaClipboardList />,
    label: "Leave Requests",
    roles: ["Admin", "HR", "Manager"],
  },
  {
    path: "/apply-leave",
    icon: <FaCalendarCheck />,
    label: "Leave",
    roles: ["Employee"],
  },
  // {
  //   path: "/attendance",
  //   icon: <FaCalendarCheck />,
  //   label: "Attendance",
  //   roles: ["Admin", "HR", "Employee"],
  // },
  // {
  //   path: "/announcements",
  //   icon: <FaBullhorn />,
  //   label: "Announcements",
  //   roles: ["Admin", "HR", "Manager", "Employee"],
  // },
];

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "Employee";

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(role)
  );

  // ✅ This is the actual logout action
  const confirmLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      } flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-3">
        <button className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <FaArrowLeft size={20} /> : <FaArrowRight size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-4 p-2">
        {filteredNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-2 rounded hover:bg-gray-700 transition ${
              location.pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isExpanded && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button (triggers modal) */}
      <button
        className="flex items-center gap-4 px-4 py-2 my-8 mx-2 rounded hover:bg-gray-700 transition"
        onClick={() => setShowLogoutModal(true)}
      >
        <span className="text-xl">
          <FaSignOutAlt />
        </span>
        {isExpanded && <span className="text-sm font-medium">Logout</span>}
      </button>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
