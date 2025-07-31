import { getEmployeeAttendanceService } from '../../src/services/attendenceService'
import axiosInstance from "../../src/services/axiosInstance";

jest.mock("../../src/services/axiosInstance")
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("This runs for fetch the Employee's Attendence", () => {
    const employeeId = '123abc098zxy'
    const errorMessage = "network error"
    const mockRes = {
        data: {
            "message": "Attendance history",
            "count": 1,
            "data": [
                {
                    "date": "2025-07-07",
                    "checkIn": "09:30",
                    "checkOut": "17:15",
                    "status": "Leave"
                }
            ]
        },
    }
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Should runs on fetch the attendence successfully", async () => {
        mockedAxios.get.mockResolvedValue(mockRes);

        const result = await getEmployeeAttendanceService(employeeId);

        expect(axiosInstance.get).toHaveBeenCalledWith(`/attendance/my-attendance/${employeeId}`)
        expect(result).toEqual(mockRes.data);
    })

    it("should runs when the error in fetch the attendence of the employee", async () => {
        mockedAxios.get.mockRejectedValue(new Error(errorMessage));

        // const result = await getEmployeeAttendanceService(employeeId);
        await expect(getEmployeeAttendanceService(employeeId)).rejects.toThrow(errorMessage);
        expect(mockedAxios.get).toHaveBeenCalledWith(`/attendance/my-attendance/${employeeId}`)
    })

})