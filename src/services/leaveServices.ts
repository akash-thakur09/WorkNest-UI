import axiosInstance from "./axiosInstance";

export const getAllLeavesByEmployeeIdService = async (employeeId: string) => {
    try {
        const res = await axiosInstance.get(`/leave/getMyLeaves/${employeeId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching leaves:", error);
        throw error;
    }
}

export const applyLeaveService = async (data: { employeeId: string; managerId:string; leaveType: string; fromDate: Date; toDate: Date; reason: string }) => {
    try {
        const res = await axiosInstance.post(`/leave/applyLeave/${data.employeeId}`, data);
        return res.data;
    } catch (error) {
        console.error("Error applying for leave:", error);
        throw error;
    }
}

export const getAllLeaveRequestsForManagerService = async (managerId: string) => {
    try {
        const res = await axiosInstance.get(`/leave/getLeavesByManagerId/${managerId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching leave requests for manager:", error);
        throw error;
    }
}

export const updateLeaveStatusService = async (id: string, status: string, managerId: string) => {
    try {
        const res = await axiosInstance.put(`/leave/approveLeaveByManager/${id}`, { status, managerId });
        return res.data;
    } catch (error) {
        console.error("Error updating leave status:", error);
        throw error;
    }
}