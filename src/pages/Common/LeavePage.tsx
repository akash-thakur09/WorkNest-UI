import Navbar from "../../components/Navbar";
import { applyLeaveService, getAllLeavesByEmployeeIdService } from "../../services/leaveServices";
import { useEffect,useState } from "react";
import {useAuth} from "../../hooks/useAuth"


interface Leave {
    id: number;
    fromDate: Date;
    toDate: Date;
    leaveType: 'Sick' | 'Casual' | 'Annual' | 'Half Day';
    reason: string;
    status: "Approved" | "Pending" | "Rejected";
    appliedAt: Date;
}

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
    const [leaveData, setLeaveData] = useState<Leave[]>([]);
    const [leaveReason, setLeaveReason] = useState("");
    const [leaveType, setLeaveType] = useState("Sick");
    const [fromDate, setFromDate] = useState<Date | null>(null);
    const [toDate, setToDate] = useState<Date | null>(null);    
    const [leavePopVisible, setLeavePopVisible] = useState(false);
    const {user} = useAuth();
    const managerId = user?.managerId;
    const employeeId = user?.id;

    const applyForLeave = () => {
        applyLeaveService({
            employeeId: employeeId!,
            managerId: managerId!,
            leaveType,
            fromDate: fromDate!,
            toDate: toDate!,
            reason: leaveReason
        })
        .then(response => {
            console.log("Leave applied successfully:", response);
            setLeavePopVisible(false);
            // Optionally, refresh the leave data
            getAllLeavesByEmployeeIdService(employeeId!)
                .then(leaves => setLeaveData(leaves.data))
                .catch(error => console.error("Error fetching leaves after applying:", error));
        })
        .catch(error => {
            console.error("Error applying for leave:", error);
            alert("Failed to apply for leave. Please try again.");
        });
    }

       

    useEffect(() => {
        getAllLeavesByEmployeeIdService(employeeId!)
            .then((leaves) => {
                console.log("Leaves fetched successfully:", leaves?.data);
                setLeaveData(leaves?.data || []);
            })
            .catch((error) => {
                console.error("Error fetching leaves:", error);
            });
    }, [])

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
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
                            onClick={() => setLeavePopVisible(true)}
                        >
                            + Apply Leave
                        </button>
                    </div>

                    <div className="rounded shadow h-[80%] overflow-auto">
                        <table className="min-w-full text-xs text-left text-gray-600">
                            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-2">From Date</th>
                                    <th className="p-2">To Date</th>
                                    <th className="p-2">Type</th>
                                    <th className="p-2">Reason</th>
                                    <th className="p-2">Applied On</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveData.map((leave) => (
                                    <tr
                                        key={leave.id}
                                        className="border-b hover:bg-gray-100 transition"
                                    >
                                        <td className="p-2">{new Date(leave.fromDate).toLocaleDateString()}</td>
                                        <td className="p-2">{new Date(leave.toDate).toLocaleDateString()}</td>
                                        <td className="p-2">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${leave.leaveType !== "Half Day"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-purple-100 text-purple-700"
                                                    }`}
                                            >
                                                {leave.leaveType}
                                            </span>
                                        </td>
                                        <td >{leave.reason}</td>
                                        <td >{new Date(leave.appliedAt).toLocaleDateString()}</td>
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

            {/* Apply Leave Popup */}
            {leavePopVisible && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Apply for Leave</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            // Logic to apply for leave
                            applyForLeave();
                            setLeavePopVisible(false);
                        }}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Leave Type</label>
                                <select
                                    value={leaveType}
                                    onChange={(e) => setLeaveType(e.target.value)}
                                    className="border rounded w-full p-2"
                                >
                                    <option value="Sick">Sick</option>
                                    <option value="Casual">Casual</option>
                                    <option value="Annual">Annual</option>
                                    <option value="Half Day">Half Day</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">From Date</label>
                                <input
                                    type="date"
                                    value={fromDate ? fromDate.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setFromDate(new Date(e.target.value))}
                                    className="border rounded w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">To Date</label>
                                <input
                                    type="date"
                                    value={toDate ? toDate.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setToDate(new Date(e.target.value))}
                                    className="border rounded w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Reason</label>
                                <textarea
                                    value={leaveReason}
                                    onChange={(e) => setLeaveReason(e.target.value)}
                                    className="border rounded w-full p-2 h-24"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded px-4 py-2"
                            >
                                Apply
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeavePage;
