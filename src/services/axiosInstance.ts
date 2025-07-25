import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.VITE_API_URL, // uncomment this when you have to run test cases for local
  baseURL: import.meta.env.VITE_API_URL, //uncomment this when you want to run the UI
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
