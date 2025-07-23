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