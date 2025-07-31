import { getAnnouncements } from '../../src/services/announcementService'
import axiosInstance from '../../src/services/axiosInstance'

jest.mock('../../src/services/axiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("Fetch All the Announcement", () => {
    const role = "Employee";
    const mockedResponse = {
        data: {
            message: 'Visible announcements',
            count: 1,
            data: [
                {
                    _id: '12345',
                    title: 'Sample Announcement',
                    message: 'This is a test announcement',
                    postedBy: {
                        _id: 'abc123',
                        fullName: 'John Doe',
                        email: 'john.doe@example.com',
                        role: 'Manager',
                    },
                    postedDate: '2025-05-30T00:00:00.000Z',
                    visibility: 'All',
                    expiryDate: '2025-07-11T00:00:00.000Z',
                    createdAt: '2025-07-22T00:24:25.216Z',
                    updatedAt: '2025-07-22T00:24:25.216Z',
                },
            ],
        },
    }

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should run on get announcement", async () => {
        mockedAxios.get.mockResolvedValue(mockedResponse);
        const result = await getAnnouncements(role);
        expect(mockedAxios.get).toHaveBeenCalledWith(`/announcements/visible-to-me?role=${role}`);
        expect(result).toEqual(mockedResponse.data)

    })

    it("Should run on the error in get announcement", async () => {
        const errorMessage = "Error fetching announcements";
        mockedAxios.get.mockRejectedValue(new Error(errorMessage));

        expect(getAnnouncements(role)).rejects.toThrow(errorMessage)
        expect(mockedAxios.get).toHaveBeenCalledWith(`/announcements/visible-to-me?role=${role}`);

    })
})