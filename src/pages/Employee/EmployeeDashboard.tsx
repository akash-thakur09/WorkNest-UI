import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import profileImg from "../../assets/profile-pic.webp"; // Adjust the path as necessary
import AttendanceCalendar from "../../components/AttendanceCalendar";
import { useLiveTimer } from "../../hooks/useLiveTimer";
import { getEmployeeByIdService } from "../../services/employeeService";
import { getAnnouncements } from "../../services/announcementService";
import { PostCheckInService, PutCheckOutService, getEmployeeAttendanceService } from "../../services/attendenceService"; // Assuming this service exists

interface EmployeeInfo {
    label: string;
    value: string;
}

interface Announcement {
    _id: number;
    title: string;
    message: string;
    postedBy: string;
    postedDate: Date;
    expiryDate: Date;
    visibility?: string; // Optional field for visibility
}

const EmployeeDashboard = () => {
    const [employeeInfo, setEmployeeInfo] = useState<Array<EmployeeInfo>>([]);
    const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [todayAttendance, setTodayAttendance] = useState<{
        checkIn: string | null;
        checkOut: string | null;
        status: string;
    } | null>(null);
    const [yesterdayAttendance, setYesterdayAttendance] = useState<{
        checkIn: string | null;
        checkOut: string | null;
        status: string;
    } | null>(null);

    const employeeId = localStorage.getItem("employeeId") || "";

    const liveDuration = useLiveTimer(todayAttendance?.checkIn || "", todayAttendance?.checkOut || "");


    const checkInOnClick = () => {
        PostCheckInService(employeeId)
            .then((res) => {
                console.log("Check-in successful", res);
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert("You have already checked in today.");
                    return;
                }
                console.error("Error during check-in:", error);
            });
    }

    const checkOutOnClick = () => {
        PutCheckOutService(employeeId)
            .then((res) => {
                console.log("Check-out successful", res);
            })
            .catch((error) => {
                console.error("Error during check-out:", error);
            });
    }

    const getFormattedDate = (date: Date) => {
        return date.toISOString().split("T")[0]; // YYYY-MM-DD
    };

    const getYesterdayDate = () => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return getFormattedDate(date);
    };

    useEffect(() => {
        const employeeId = localStorage.getItem("employeeId") || "";

        getEmployeeAttendanceService(employeeId)
            .then((res) => {
                const todayStr = getFormattedDate(new Date());
                const yesterdayStr = getYesterdayDate();

                const todayRecord = res.data.find((entry: any) => entry.date === todayStr);
                const yesterdayRecord = res.data.find((entry: any) => entry.date === yesterdayStr);

                if (todayRecord) {
                    setTodayAttendance({
                        checkIn: todayRecord.checkIn || null,
                        checkOut: todayRecord.checkOut || null,
                        status: todayRecord.status,
                    });
                }

                if (yesterdayRecord) {
                    setYesterdayAttendance({
                        checkIn: yesterdayRecord.checkIn || null,
                        checkOut: yesterdayRecord.checkOut || null,
                        status: yesterdayRecord.status,
                    });
                }
            })
            .catch((err) => {
                console.error("Error fetching attendance data:", err);
            });
    }, []);

    // Fetch announcements
    // This will filter announcements based on the role and current date
    useEffect(() => {
        const role = localStorage.getItem("role") || "Employee";
        getAnnouncements(role)
            .then(res => {
                const filteredAnnouncements = res.data.filter((announcement: Announcement) => {
                    const currentDate = new Date();
                    return new Date(announcement.expiryDate) >= currentDate && announcement.visibility === "All" || announcement.visibility === role;
                });
                console.log('filteredAnnouncements: ',filteredAnnouncements);
                setAnnouncements(filteredAnnouncements);
            })
            .catch(error => {
                console.error("Error fetching announcements:", error);
            });
    }, []);

    // Company's holiday
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

    // Fetch employee details 
    useEffect(() => {
        const employeeId = localStorage.getItem("employeeId") || "";
        getEmployeeByIdService(employeeId)
            .then(data => {
                // console.log("Employee details fetched:", data);
                setEmployeeInfo(data.user);
            })
            .catch(error => {
                console.error("Error fetching employee information:", error);
            });
    }, []);

    const EmployeeInfo = [
        { label: "Name", value: employeeInfo?.fullName || "Name" },
        { label: "Email", value: employeeInfo?.email || "Email" },
        { label: "Position", value: employeeInfo?.position || "please Update you info" },
        { label: "Company Experience", value: employeeInfo?.companyExperience || "please Update you info" },
        { label: "Total Experience", value: employeeInfo?.totalExperience || "please Update you info" },
        { label: "Address", value: employeeInfo?.address || "please Update you info" }
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
                                    <p className="text-sm">Last Check-In Time: <span className="font-bold">{yesterdayAttendance?.checkIn || "N/A"}</span></p>
                                </div>
                                <div>
                                    <p className="text-sm">Last Check-Out Time: <span className="font-bold">{yesterdayAttendance?.checkOut || "N/A"}</span></p>
                                </div>
                            </div>
                            <div className=" flex w-1/2 justify-between">
                                <button
                                    className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800 transition cursor-pointer"
                                    onClick={checkInOnClick}
                                >
                                    Check-In
                                </button>
                                <button
                                    className="bg-red-700 text-white px-4 py-1 rounded hover:bg-red-800 transition cursor-pointer"
                                    onClick={checkOutOnClick}
                                >
                                    Check-Out
                                </button>
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
                                    key={announcement._id}
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
                            <p><strong>Posted By:</strong> {selectedAnnouncement.postedBy.fullName}</p>
                            <p><strong>Posted Date:</strong> {(new Date(selectedAnnouncement.postedDate)).toLocaleDateString()}</p>
                            <p><strong>Expiry Date:</strong> {(new Date(selectedAnnouncement.expiryDate)).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDashboard;
