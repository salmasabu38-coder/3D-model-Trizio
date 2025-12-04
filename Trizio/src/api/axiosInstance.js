import axios from "axios";

// Vite env variables must start with VITE_
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if backend uses cookies
});

export default axiosInstance;
