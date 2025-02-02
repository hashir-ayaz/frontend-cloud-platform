import containerApi from "../api/containerApiConfig";
import { Model, ContainerDetails } from "../types/types";

// Fetch all available models
export const getAvailableModels = async (): Promise<Model[]> => {
  try {
    console.log(
      "VITE_CONTAINER_SERVICE_URL:",
      import.meta.env.VITE_CONTAINER_SERVICE_URL
    );
    const response = await containerApi.get<Model[]>("/models/"); // Adjust the endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching available models:", error);
    throw error;
  }
};

// Deploy a new container model
export const deployModel = async (
  availableModelId: number,
  environment: Record<string, string>,
  name: string,
  ports: Array<{ port: number; protocol: "tcp" | "udp" }>
): Promise<{
  containerId: string;
  availableModelId: number;
  environment: Record<string, string>;
  ports: Array<{ port: number; protocol: "tcp" | "udp" }>;
}> => {
  try {
    const response = await containerApi.post("/deploy/container", {
      available_model_id: availableModelId,
      environment,
      name,
      ports,
    });

    console.log("Model deployed successfully:", response.data);

    // ✅ Mapping the API response to the expected return format
    return {
      containerId: response.data.container_id,
      availableModelId: response.data.available_model_id,
      environment: response.data.environment,
      ports: response.data.ports.map((port: any) => ({
        port: port.container_port,
        protocol: port.protocol,
      })),
    };
  } catch (error) {
    console.error("Error deploying model:", error);
    throw error;
  }
};

// Fetch container by ID
export const getContainerById = async (
  containerId: string
): Promise<ContainerDetails | null> => {
  try {
    const response = await containerApi.get(`/deploy/container/${containerId}`);
    console.log("Fetched container details:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching container with ID ${containerId}:`, error);
    throw error;
  }
};

// Fetch all containers for a specific user
export const getContainersByUserId = async (
  userId: string | undefined
): Promise<any[]> => {
  try {
    const response = await containerApi.get(
      `/deploy/containers/user/${userId}`
    );
    console.log("Fetched containers for user:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching containers for user ID ${userId}:`, error);
    throw error;
  }
};

// Stop a container by ID
export const stopContainerById = async (containerId: string): Promise<void> => {
  try {
    await containerApi.post(`/deploy/container/${containerId}/stop`);
    console.log(`Container ${containerId} stopped successfully.`);
  } catch (error) {
    console.error(`Error stopping container with ID ${containerId}:`, error);
    throw error;
  }
};

// Delete a container by ID
export const deleteContainerById = async (
  containerId: string
): Promise<void> => {
  try {
    await containerApi.delete(`/deploy/container/${containerId}`);
    console.log(`Container ${containerId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting container with ID ${containerId}:`, error);
    throw error;
  }
};

// Start a container by ID
export const startContainerById = async (
  containerId: string
): Promise<void> => {
  try {
    await containerApi.post(`/deploy/container/${containerId}/start`);
    console.log(`Container ${containerId} started successfully.`);
  } catch (error) {
    console.error(`Error starting container with ID ${containerId}:`, error);
    throw error;
  }
};
