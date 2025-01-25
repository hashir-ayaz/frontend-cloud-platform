import axios from "axios";

const BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies (if needed)
});

// Add a request interceptor to include the JWT token in the Authorization header
authApi.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("jwt");

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default authApi;