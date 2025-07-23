import axiosInstance from "./axiosInstance"

export const getEmployeeByIdService = async(employeeId: string)=>{
    try{
        const res = await axiosInstance.get(`/employee/get-employee-details/${employeeId}`);
        return res.data;
    }catch(error){
        console.error("Error fetching employee:", error);
        throw error;
    }
}