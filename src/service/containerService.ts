import containerApi from "../api/containerApiConfig";

// Define the type for a model
export interface Model {
  id: number;
  name: string;
  description?: string;
  docker_image: string;
  version: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Fetch all available models
export const getAvailableModels = async (): Promise<Model[]> => {
  try {
    const response = await containerApi.get<Model[]>("/models/"); // Adjust the endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching available models:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// Example usage:
// getAvailableModels()
//   .then((models) => console.log(models))
//   .catch((error) => console.error(error));
