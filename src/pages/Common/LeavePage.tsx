import Navbar from "../../components/Navbar";
import { useState } from "react";

interface Leave {
    id: number;
    date: string;
    type: "Full Day" | "Half Day";
    reason: string;
    status: "Approved" | "Pending" | "Rejected";
    appliedOn: string;
}

const dummyLeaves: Leave[] = [
    {
        id: 1,
        date: "2025-07-10",
        type: "Full Day",
        reason: "Medical Appointment",
        status: "Approved",
        appliedOn: "2025-07-08",
    },
    {
        id: 2,
        date: "2025-07-12",
        type: "Half Day",
        reason: "Personal Work",
        status: "Pending",
        appliedOn: "2025-07-10",
    },
    {
        id: 3,
        date: "2025-07-05",
        type: "Full Day",
        reason: "Family Event",
        status: "Rejected",
        appliedOn: "2025-07-03",
    },
    {
        id: 4,
        date: "2025-07-15",
        type: "Half Day",
        reason: "Urgent Task",
        status: "Approved",
        appliedOn: "2025-07-13",
    },
    {
        id: 5,
        date: "2025-07-20",
        type: "Full Day",
        reason: "Vacation",
        status: "Pending",
        appliedOn: "2025-07-18",
    },
    {
        id: 6,
        date: "2025-07-25",
        type: "Half Day",
        reason: "Training Session",
        status: "Approved",
        appliedOn: "2025-07-23",
    },
    {
        id: 7,
        date: "2025-07-30",
        type: "Full Day",
        reason: "Sick Leave",
        status: "Rejected",
        appliedOn: "2025-07-28",
    },
    {
        id: 8,
        date: "2025-08-02",
        type: "Half Day",
        reason: "Meeting with Client",
        status: "Pending",
        appliedOn: "2025-07-31",
    },
    {
        id: 9,
        date: "2025-08-05",
        type: "Full Day",
        reason: "Public Holiday",
        status: "Approved",
        appliedOn: "2025-08-03",
    },
    {
        id: 10,
        date: "2025-08-10",
        type: "Half Day",
        reason: "Work from Home",
        status: "Pending",
        appliedOn: "2025-08-08",
    },
    {
        id: 11,
        date: "2025-08-15",
        type: "Full Day",
        reason: "Conference Attendance",
        status: "Approved",
        appliedOn: "2025-08-13",
    },
    {
        id: 12,
        date: "2025-08-20",
        type: "Half Day",
        reason: "Team Building Activity",
        status: "Pending",
        appliedOn: "2025-08-18",
    },
    {
        id: 13,
        date: "2025-08-25",
        type: "Full Day",
        reason: "Emergency Leave",
        status: "Rejected",
        appliedOn: "2025-08-23",
    },
    {
        id: 14,
        date: "2025-08-30",
        type: "Half Day",
        reason: "Client Meeting",
        status: "Approved",
        appliedOn: "2025-08-28",
    },
    {
        id: 15,
        date: "2025-09-05",
        type: "Full Day",
        reason: "Family Function",
        status: "Pending",
        appliedOn: "2025-09-03",
    },
    {
        id: 16,
        date: "2025-09-10",
        type: "Half Day",
        reason: "Work-Life Balance",
        status: "Approved",
        appliedOn: "2025-09-08",
    },
    {
        id: 17,
        date: "2025-09-15",
        type: "Full Day",
        reason: "Religious Holiday",
        status: "Rejected",
        appliedOn: "2025-09-13",
    },
    {
        id: 18,
        date: "2025-09-20",
        type: "Half Day",
        reason: "Project Deadline",
        status: "Pending",
        appliedOn: "2025-09-18",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Approved":
            return "bg-green-100 text-green-700";
        case "Pending":
            return "bg-yellow-100 text-yellow-700";
        case "Rejected":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const LeavePage = () => {
    const [leaves] = useState<Leave[]>(dummyLeaves);

    return (
        <div className="flex bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Navbar />
            <div className="flex w-full">
                {/* Right section */}
                <div className="w-1/2 h-screen flex flex-col justify-center items-center">
                    <div className="flex flex-col w-1/2 m-2">
                        <h1 className="rounded-t-lg bg-gray-500 w-full p-2 text-white font-bold">Remaining Leaves</h1>
                        <div className="h-[200px] bg-gray-200">

                        </div>

                    </div>
                    <div className="flex flex-col w-1/2 m-2">
                        <h1 className="rounded-t-lg bg-gray-500 w-full p-2 text-white font-bold">Teken Leaves</h1>
                        <div className="h-[200px] bg-gray-200">

                        </div>

                    </div>
                </div>

                {/* Left section */}
                <div className="flex-1 w-1/2 h-screen ">
                    {/* Main Section */}
                    {/* Header */}
                    <div className="flex justify-between items-center h-[10%] bg-gray-200 p-4">
                        <h1 className="text-xl font-bold text-gray-800">My Leave Requests</h1>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer">
                            + Apply Leave
                        </button>
                    </div>
                    
                    {/* <div className="h-[90%] bg-red-400"> */}
                        {/* <div className="flex-1 h-[90%] bg-red-400"> */}
                            {/* Table */}
                            <div className="rounded shadow h-[80%] overflow-auto">
                                <table className="min-w-full text-xs text-left text-gray-600">
                                    <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="p-2">Date</th>
                                            <th className="p-2">Type</th>
                                            <th className="p-2">Reason</th>
                                            <th className="p-2">Applied On</th>
                                            <th className="p-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaves.map((leave) => (
                                            <tr
                                                key={leave.id}
                                                className="border-b hover:bg-gray-100 transition"
                                            >
                                                <td className="p-2">{leave.date}</td>
                                                <td className="p-2">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-semibold ${leave.type === "Full Day"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-purple-100 text-purple-700"
                                                            }`}
                                                    >
                                                        {leave.type}
                                                    </span>
                                                </td>
                                                <td >{leave.reason}</td>
                                                <td >{leave.appliedOn}</td>
                                                <td >
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                            leave.status
                                                        )}`}
                                                    >
                                                        {leave.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        {/* </div> */}
                    {/* </div> */}
                    
                    {/* <div className="h-[10%] bg-green-300"> */}
                        {/* Legend */}
                        <div className="flex gap-4 text-xs text-gray-600 h-[10%] p-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Approved
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block"></span> Pending
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span> Rejected
                            </div>
                        </div>
                    {/* </div> */}

                </div>
            </div>

        </div>
    );
};

export default LeavePage;
