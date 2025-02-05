import apiKeyApi from "../api/apiKeyApiConfig"; // Adjust the path if needed
import { ApiKey } from "../types/types";

export const createApiKey = async (
  containerId: string
): Promise<{ message: string; api_key: string; container_id: string }> => {
  try {
    const response = await apiKeyApi.post("/api-keys/", {
      container_id: containerId,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error creating API key:",
        (error as any).response?.data || error.message
      );
    }
    throw error;
  }
};

export const deleteApiKey = async (
  apiKeyId: string
): Promise<{ message: string }> => {
  try {
    const response = await apiKeyApi.delete(`/api-keys/${apiKeyId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error deleting API key:",
        (error as any).response?.data || error.message
      );
    }
    throw error;
  }
};

export const getApiKeysByContainer = async (
  containerId: string
): Promise<{ message: string; container_id: string; api_keys: ApiKey[] }> => {
  try {
    const response = await apiKeyApi.get(`/api-keys/${containerId}`);

    // Ensure each API key in the response matches the `ApiKey` interface
    const formattedApiKeys: ApiKey[] = response.data.api_keys.map(
      (key: { id: string; key: string; container_id: string }) => ({
        id: key.id,
        key: key.key,
        container_id: key.container_id, // Ensure `container_id` is present
      })
    );

    return {
      message: response.data.message,
      container_id: response.data.container_id, // Ensure `container_id` is included in the response
      api_keys: formattedApiKeys,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error fetching API keys:",
        (error as any).response?.data || error.message
      );
    }
    throw error;
  }
};
