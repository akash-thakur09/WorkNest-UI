import React, { useMemo, useCallback } from "react";

interface ProfileNavbarProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const tabs = ["Personal Details", "Documents", "Others"];

const ProfileNavbar: React.FC<ProfileNavbarProps> = ({ activeTab, setActiveTab }) => {
  // Memoize tab click handler to prevent recreation on every render
  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, [setActiveTab]);

  // Memoize tab rendering to prevent unnecessary re-renders
  const renderedTabs = useMemo(() => 
    tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => handleTabClick(tab)}
        className={`text-sm md:text-base font-medium pb-2 border-b-2 transition-colors duration-300 ${
          activeTab === tab
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-600"
        }`}
      >
        {tab}
      </button>
    )), [activeTab, handleTabClick]);

  return (
    <div className="w-full bg-white shadow-md px-4 py-3 border-b border-gray-200">
      <div className="flex gap-6">
        {renderedTabs}
      </div>
    </div>
  );
};

export default ProfileNavbar;
