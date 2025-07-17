import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import profileImg from "../../assets/profile-pic.webp"; // Adjust the path as necessary
import AttendanceCalendar from "../../components/AttendanceCalendar";
import { useLiveTimer } from "../../hooks/useLiveTimer";

const EmployeeDashboard = () => {
    // const role = localStorage.getItem("role") || "Employee";
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
    // const todayHours = new Date().getHours();
    const checkInTime = "09:00";
    const checkOutTime = ""; // or set to "17:30" when checked out
    const liveDuration = useLiveTimer(checkInTime, checkOutTime);
    const announcements = [
        { id: 1, title: "Company Meeting", message: "Join us for the quarterly company meeting on Friday at 10 AM.", postedBy: "Admin", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 2, title: "Holiday Schedule", message: "The office will be closed for the holidays from December 24th to January 1st.", postedBy: "HR", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 3, title: "New Policy Update", message: "Please review the updated company policies in the employee handbook.", postedBy: "Admin", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 4, title: "Team Building Event", message: "Join us for a team-building event next month. Details to follow.", postedBy: "Manager", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 5, title: "Health and Safety Training", message: "Mandatory health and safety training for all employees next week.", postedBy: "HR", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 6, title: "Performance Review Schedule", message: "Performance reviews will be conducted next month. Please prepare accordingly.", postedBy: "Admin", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 7, title: "New Software Rollout", message: "We will be rolling out new software next week. Training sessions will be scheduled.", postedBy: "IT", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 8, title: "Employee Recognition Program", message: "Nominate your peers for the Employee of the Month award. Submissions open until the end of the month.", postedBy: "HR", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 9, title: "Office Renovation", message: "The office will undergo renovations starting next week. Please be prepared for some disruptions.", postedBy: "Admin", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 10, title: "Training Workshop", message: "A training workshop on time management will be held next month. Sign up in the employee portal.", postedBy: "Manager", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 11, title: "New Hire Orientation", message: "Orientation for new hires will take place next week. All employees are encouraged to welcome our new team members.", postedBy: "HR", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        { id: 12, title: "Feedback Session", message: "We will hold a feedback session next month to gather your thoughts on company policies and work environment.", postedBy: "Admin", postedDate: new Date(), expiryDate: new Date("2023-12-31") },
        // ...rest of your announcements
    ];

    const Holidays = [
        { date: "2023-12-25", name: "Christmas" },
        { date: "2024-01-01", name: "New Year's Day" },
        { date: "2024-07-04", name: "Independence Day" },
        { date: "2024-11-28", name: "Thanksgiving" },
        { date: "2024-12-25", name: "Christmas" },
        { date: "2025-01-01", name: "New Year's Day" },
        { date: "2025-07-04", name: "Independence Day" },
        { date: "2025-11-27", name: "Thanksgiving" },
        // Add more holidays as needed
    ];

    const EmployeeInfo = [
        { label: "Name", value: "John Doe" },
        { label: "Email", value: "john.doe@example.com" },
        { label: "Position", value: "Software Engineer" },
        { label: "Company Experience", value: "3 years" },
        { label: "Total Experience", value: "5 years" },
        { label: "Address", value: "123 Main St, Anytown, USA" }
    ]

    return (
        <div className="w-full h-full flex flex-col ">
            {/* Top Sections */}
            <div className="bg-gray-300 w-full h-3/4 flex">
                <div className="w-1/2">
                <div>
                    
                </div>
                    <div className="h-2/5 flex flex-col m-2">
                        <div className="h-1/5">
                            <h1 className="bg-gray-600 text-white font-bold p-1 rounded-t-lg">Employee Information</h1>
                        </div>
                        <div className="flex h-4/5">
                            <div className="w-1/3 rounded-lg">
                            {/* Employee profile photo */}
                            <img src={profileImg} alt="Profile" className="w-full h-full rounded-l-lg" />
                        </div>
                        <div className="w-2/3 bg-gray-200 rounded-r-lg">
                            {/* Employee Information */}
                            {EmployeeInfo.map((info, index) => (
                                <p key={index} className="p-1 text-xs"><b>{info.label}:</b> {info.value}</p>
                            ))}

                        </div>
                        </div>
                    </div>
                    <div className="h-3/5 flex p-4 m-2 justify-center">
                        <div className="h-full">
                            <AttendanceCalendar />

                        </div>
                        <div className="ml-2 rounded-lg w-[300px] h-[200px]">
                            <h1 className="bg-gray-600 text-white font-bold p-2 w-full rounded-t-lg text-sm">Company Holidays</h1>
                            <div className="bg-gray-100 p-2 h-full overflow-auto rounded-b-lg">
                                {Holidays.map((holiday, index) => (
                                    <div key={index} className=" p-1 border-b border-gray-300 flex">
                                        <p className="text-xs">{`${holiday.date}:   ${holiday.name}`}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-1/2">
                    <div className="h-1/5 bg-gray-300 p-2 m-2">
                        <div className="flex justify-around items-center">
                            <div className="w-1/2">
                                <div>
                                    <p className="text-sm">Last Check-In Time: <span className="font-bold">09:00 AM</span></p>
                                </div>
                                <div>
                                    <p className="text-sm">Last Check-Out Time: <span className="font-bold">05:00 PM</span></p>
                                </div>
                            </div>
                            <div className=" flex w-1/2 justify-between">
                                <button className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800 transition cursor-pointer">Check-In</button>
                                <button className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition cursor-pointer">Check-Out</button>
                            </div>
                        </div>
                        <div className="flex justify-between bg-gray-200 my-2 p-2">

                            <div className="text-sm px-2">
                                Time Since Check-In: <span className="font-bold">{liveDuration}</span>
                            </div>
                            <div className="text-sm px-2">
                                Current Time: <span className="font-bold"> {new Date().toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-4/5 m-2">
                        {/* Announcement List */}
                        <h1 className="bg-gray-600 text-white font-bold p-2 w-full rounded-t-lg">Notice Board</h1>
                        <div className="bg-gray-100 text-black p-1 w-full h-4/5 overflow-auto mt-1">
                            {announcements.map((announcement) => (
                                <div
                                    key={announcement.id}
                                    className="cursor-pointer text-sm hover:bg-gray-500 rounded p-2"
                                    onClick={() => setSelectedAnnouncement(announcement)}
                                >
                                    <h2>{announcement.title}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="h-1/4 bg-gray-600 rounded-lg flex">
                {/* Announcement List */}
                {/* <p className="text-sm">Announcements</p> */}
                {/* Bottom first div */}
                <div className="w-1/3 m-2">
                    <h1 className="text-xs mx-2 bg-gray-500 text-white px-2 h-1/5 font-semibold rounded-t-lg">Upcoming Birthdays</h1>
                    <div className="h-4/5 mx-2 bg-white">

                    </div>

                </div>
                {/* Bottom second div */}
                <div className="w-1/3 m-2">
                    <h1 className="text-xs mx-2 bg-gray-500 text-white px-2 h-1/5 font-semibold  rounded-t-lg">Upcoming Events</h1>
                    <div className="h-4/5 mx-2 bg-white">

                    </div>
                </div>
                {/* Bottom third div */}
                <div className="w-1/3 m-2">
                    <h1 className="text-xs mx-2 bg-gray-500 text-white px-2 h-1/5 font-semibold  rounded-t-lg">Recent Joinees</h1>
                    <div className="h-4/5 mx-2 bg-white">

                    </div>
                </div>
            </div>

            {/* Modal Popup */}
            {selectedAnnouncement && (
                <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-[90%] p-6 relative">
                        {/* Close Icon */}
                        <button
                            className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-900"
                            onClick={() => setSelectedAnnouncement(null)}
                        >
                            <FaTimes size={20} />
                        </button>

                        {/* Announcement Content */}
                        <h2 className="text-xl font-bold">{selectedAnnouncement.title}</h2>
                        <p className="text-gray-700">{selectedAnnouncement.message}</p>
                        <div className="text-sm text-gray-500">
                            <p><strong>Posted By:</strong> {selectedAnnouncement.postedBy}</p>
                            <p><strong>Posted Date:</strong> {selectedAnnouncement.postedDate.toLocaleDateString()}</p>
                            <p><strong>Expiry Date:</strong> {selectedAnnouncement.expiryDate.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDashboard;
