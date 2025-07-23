import axiosInstance from "./axiosInstance";

export const loginService = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const registerService = async (data: { email: string; password: string; name: string, userRole: string, registrationDate: Date }) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};
