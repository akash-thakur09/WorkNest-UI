import axiosInstance from "./axiosInstance";

export const getEmployeeAttendanceService = async (employeeId: string) => {
    try {
        const res = await axiosInstance.get(`/attendance/my-attendance/${employeeId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching employee attendance:", error);
        throw error;
    }
}

export const PostCheckInService = async (employeeId: string) => {
    try {
        const res = await axiosInstance.post(`/attendance/check-in`, { userId:employeeId });
        // window.location.reload(); // Reload to reflect changes immediately
        return res.data;
    } catch (error) {
        console.error("Error checking in:", error);
        throw error;
    }
}

export const PutCheckOutService = async (employeeId: string) => {
    try {
        const res = await axiosInstance.put(`/attendance/check-out`, { userId:employeeId });
        // window.location.reload(); // Reload to reflect changes immediately
        return res.data;
    } catch (error) {
        console.error("Error checking out:", error);
        throw error;
    }
}