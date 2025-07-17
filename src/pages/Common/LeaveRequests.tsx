import { useState } from "react";
import Navbar from "../../components/Navbar";

interface LeaveRequest {
  id: number;
  employeeName: string;
  type: "Full Day" | "Half Day";
  fromDate: string;
  toDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedOn: string;
}

const dummyRequests: LeaveRequest[] = [
  {
    id: 1,
    employeeName: "Akash Thakur",
    type: "Full Day",
    fromDate: "2025-07-10",
    toDate: "2025-07-11",
    reason: "Family function",
    status: "Pending",
    appliedOn: "2025-07-08",
  },
  {
    id: 2,
    employeeName: "Neha Singh",
    type: "Half Day",
    fromDate: "2025-07-12",
    toDate: "2025-07-12",
    reason: "Doctor appointment",
    status: "Pending",
    appliedOn: "2025-07-09",
  },
];

const LeaveRequests = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>(dummyRequests);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);

  const handleApprove = () => {
    if (!selectedRequest) return;
    setRequests(prev =>
      prev.map(req =>
        req.id === selectedRequest.id ? { ...req, status: "Approved" } : req
      )
    );
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    setRequests(prev =>
      prev.map(req =>
        req.id === selectedRequest.id ? { ...req, status: "Rejected" } : req
      )
    );
    setSelectedRequest(null);
  };

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
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className="border-b cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{req.employeeName}</td>
                  <td className="px-6 py-4">{req.type}</td>
                  <td className="px-6 py-4">{req.fromDate}</td>
                  <td className="px-6 py-4">{req.toDate}</td>
                  <td className="px-6 py-4">{req.appliedOn}</td>
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
                <p><strong>Employee:</strong> {selectedRequest.employeeName}</p>
                <p><strong>Type:</strong> {selectedRequest.type}</p>
                <p><strong>From:</strong> {selectedRequest.fromDate}</p>
                <p><strong>To:</strong> {selectedRequest.toDate}</p>
                <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                <p><strong>Applied On:</strong> {selectedRequest.appliedOn}</p>
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
