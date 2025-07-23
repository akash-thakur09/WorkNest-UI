import axiosInstance from "./axiosInstance";

export const getAnnouncements = async () => {
    try {
        const res = await axiosInstance.get(`/announcements`);
        return res.data;
    } catch (error) {
        console.error("Error fetching announcements:", error);
        throw error;
    }
}