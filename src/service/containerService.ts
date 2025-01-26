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
    console.log("VITE_CONTAINER_SERVICE_URL:", import.meta.env.VITE_CONTAINER_SERVICE_URL);
    const response = await containerApi.get<Model[]>("/models/"); // Adjust the endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching available models:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const deployModel = async (
  availableModelId: number,
  environment: Record<string, string>,
  name: string
): Promise<{
  containerId: string;
  availableModelId: number;
  environment: Record<string, string>;
}> => {
  try {
    const response = await containerApi.post("/deploy/container", {
      available_model_id: availableModelId,
      environment,
      name,
    });

    console.log("Model deployed successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deploying model:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// Fetch container by ID
export const getContainerById = async (containerId: string): Promise<any> => {
  try {
    const response = await containerApi.get(`/deploy/container/${containerId}`);
    console.log("Fetched container details:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching container with ID ${containerId}:`, error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// Fetch all containers for a specific user
export const getContainersByUserId = async (userId: number): Promise<any[]> => {
  try {
    const response = await containerApi.get(
      `/deploy/containers/user/${userId}`
    );
    console.log("Fetched containers for user:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching containers for user ID ${userId}:`, error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// Example usage:
// getContainerById("1234-5678-9101")
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// getContainersByUserId(1)
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
