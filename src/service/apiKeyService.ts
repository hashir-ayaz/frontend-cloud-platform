import apiKeyApi from "../api/apiKeyApiConfig"; // Adjust the path if needed

export const createApiKey = async (containerId: string): Promise<{ message: string; api_key: string; container_id: string }> => {
  try {
    const response = await apiKeyApi.post("/api-keys/", {
      container_id: containerId,
    });
    return response.data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating API key:", (error as any).response?.data || error.message);
    }
    throw error;
  }
};

export const deleteApiKey = async (apiKeyId: string): Promise<{ message: string }> => {
  try {
    const response = await apiKeyApi.delete(`/api-keys/${apiKeyId}`);
    return response.data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error deleting API key:", (error as any).response?.data || error.message);
    }
    throw error;
  }
};

export const getApiKeysByContainer = async (containerId: string): Promise<{ message: string; api_keys: { id: string; key: string }[] }> => {
  try {
    const response = await apiKeyApi.get(`/api-keys/${containerId}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching API keys:", (error as any).response?.data || error.message);
    }
    throw error;
  }
};
