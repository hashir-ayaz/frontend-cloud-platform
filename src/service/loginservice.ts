import authApi from "../api/authApiConfig.js";
import { AxiosError } from "axios";
import { useUserStore } from "../store/useUserStore.js"; // Import your Zustand store

// Define types for function parameters and return values
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  message: string;
  token?: string; // Optional, depending on the backend response
  user?: User; // Assuming the backend sends the user details
}

interface ErrorResponse {
  error: string;
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    console.log(
      `Sending Login request to ${authApi.defaults.baseURL}/auth/login`
    );
    const response = await authApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    console.log(`request sent to ${authApi.defaults.baseURL}/auth/login`);

    // Extract user details and token from the response
    const { user, token } = response.data;

    if (user && token) {
      // Store the token in localStorage
      localStorage.setItem("jwt", token);
      console.log("JWT stored in localStorage:", token);

      // Update Zustand store with user details
      useUserStore.getState().setUser(user);
      console.log("User logged in:", user);
    }

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError<ErrorResponse>(error)) {
      console.error("Error:", error.response?.data.error || "Unknown error");
      throw new Error(error.response?.data.error || "An error occurred");
    } else {
      console.error("Network Error:", (error as Error).message);
      throw new Error("Something went wrong. Please try again later.");
    }
  }
};

// Signup function
export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await authApi.post<AuthResponse>("/auth/signup", {
      name,
      email,
      password,
    });

    // Extract user details and token from the response
    const { user, token } = response.data;

    if (user && token) {
      // Store the token in localStorage
      localStorage.setItem("jwt", token);
      console.log("JWT stored in localStorage:", token);

      // Update Zustand store with user details
      useUserStore.getState().setUser(user);
      console.log("User signed up:", user);
    }

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError<ErrorResponse>(error)) {
      console.error("Error:", error.response?.data.error || "Unknown error");
      throw new Error(error.response?.data.error || "An error occurred");
    } else {
      console.error("Network Error:", (error as Error).message);
      throw new Error("Something went wrong. Please try again later.");
    }
  }
};

// Type guard to check if an error is an AxiosError
function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return (error as AxiosError<T>).isAxiosError !== undefined;
}

// // Logout function (optional)
// export const logout = async (): Promise<void> => {
//   try {
//     const response = await api.post("/auth/logout");

//     // Clear user from Zustand store on logout
//     useUserStore.getState().clearUser();
//     console.log("User logged out");

//     return response.data;
//   } catch (error: unknown) {
//     if (isAxiosError<ErrorResponse>(error)) {
//       console.error(
//         "Error during logout:",
//         error.response?.data.error || "Unknown error"
//       );
//       throw new Error(error.response?.data.error || "An error occurred");
//     } else {
//       console.error("Network Error:", (error as Error).message);
//       throw new Error("Something went wrong. Please try again later.");
//     }
//   }
// };
