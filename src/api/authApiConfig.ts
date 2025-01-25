import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_AUTH_SERVICE_URL ;

const authApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies
});

export default authApi;
