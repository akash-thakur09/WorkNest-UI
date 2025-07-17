import axios from "./axiosInstance";

export const loginService = async (data: { email: string; password: string }) => {
  const res = await axios.post("/auth/login", data);
  return res.data;
};

export const registerService = async (data: { email: string; password: string; name: string }) => {
  const res = await axios.post("/auth/register", data);
  return res.data;
};
