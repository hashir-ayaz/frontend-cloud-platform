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

// Example usage:
// deployModel(1, { ENV_VAR: "value" }, "my-container")
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
