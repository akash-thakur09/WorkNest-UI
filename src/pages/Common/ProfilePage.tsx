import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileNavbar from "../../components/ProfileNavbar";

// Dummy sections
const PersonalDetails = () => (
  <div className="p-6 bg-white rounded shadow">👤 This is Personal Details section</div>
);
const Documents = () => (
  <div className="p-6 bg-white rounded shadow">📄 This is Documents section</div>
);
const Others = () => (
  <div className="p-6 bg-white rounded shadow">📦 This is Others section</div>
);

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("Personal Details");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Details":
        return <PersonalDetails />;
      case "Documents":
        return <Documents />;
      case "Others":
        return <Others />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Tabs */}
        <ProfileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-6">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
