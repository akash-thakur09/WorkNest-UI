import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAllLeaveRequestsForManagerService, updateLeaveStatusService } from "../../services/leaveServices";

// TypeScript interfaces
interface EmployeeInfo {
  _id: string;
  fullName: string;
}

interface LeaveRequest {
  _id: string;
  employeeId: EmployeeInfo;
  leaveType: "Sick" | "Casual" | "Annual" | "Half Day";
  fromDate: string;
  toDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedAt: string;
}

interface NameMap {
  [key: string]: string;
}

const LeaveRequests = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [fullNameMap, setFullNameMap] = useState<NameMap>({});
  const managerId = localStorage.getItem("managerId") || "";

  const handleApprove = () => {
    if (!selectedRequest) return;
    console.log("Approving request:", selectedRequest._id);

    // Update the request status to Approved
    updateLeaveStatusService(String(selectedRequest._id), "Approved", managerId)
      .then(() => {
        console.log("Leave request approved successfully");
      })
      .catch((error) => {
        console.error("Error approving leave request:", error);
      });
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    console.log("Rejecting request:", selectedRequest._id);

    updateLeaveStatusService(String(selectedRequest._id), "Rejected", managerId)
      .then(() => {
        console.log("Leave request rejected successfully");
      })
      .catch((error) => {
        console.error("Error rejecting leave request:", error);
      });
    setSelectedRequest(null);
  };

  useEffect(() => {
    if (!managerId) return;

    getAllLeaveRequestsForManagerService(managerId)
      .then((response) => {
        const leaves: LeaveRequest[] = response.leaves;

        // Build the fullName map
        console.log("Fetched leave requests:", leaves);
        const nameMap: NameMap = {};
        leaves.forEach((req) => {
          nameMap[req.employeeId._id] = req.employeeId.fullName;
        });

        setFullNameMap(nameMap);
        setRequests(leaves);
      })
      .catch((error) => {
        console.error("Error fetching leave requests:", error);
      });

      // console.log("Fetched leave requests:", requests);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Leave Requests</h1>

        <div className="bg-white shadow rounded overflow-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">From</th>
                <th className="px-6 py-3">To</th>
                <th className="px-6 py-3">Applied On</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  onClick={() => setSelectedRequest(req)}
                  className="border-b cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{fullNameMap[req.employeeId._id]}</td>
                  <td className="px-6 py-4">{req.leaveType}</td>
                  <td className="px-6 py-4">{req.fromDate}</td>
                  <td className="px-6 py-4">{req.toDate}</td>
                  <td className="px-6 py-4">{req.appliedAt}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Leave Request Details</h2>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-500 hover:text-gray-700 text-lg"
                >
                  ✖
                </button>
              </div>

              <div className="space-y-2 text-gray-700 text-sm">
                <p>
                  <strong>Employee:</strong>{" "}
                  {fullNameMap[selectedRequest.employeeId._id]}
                </p>
                <p><strong>Type:</strong> {selectedRequest.leaveType}</p>
                <p><strong>From:</strong> {selectedRequest.fromDate}</p>
                <p><strong>To:</strong> {selectedRequest.toDate}</p>
                <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                <p><strong>Applied On:</strong> {selectedRequest.appliedAt}</p>
              </div>

              <div className="flex justify-end mt-6 gap-4">
                <button
                  onClick={handleReject}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequests;
