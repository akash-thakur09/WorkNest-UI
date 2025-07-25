import axiosInstance from "./axiosInstance";

export const getAnnouncements = async (role:string) => {
    try {
        const res = await axiosInstance.get(`/announcements/visible-to-me?role=${role}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching announcements:", error);
        throw error;
    }
}