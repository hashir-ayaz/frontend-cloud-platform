import apiKeyApi from "../api/apiKeyApiConfig"; // Adjust the path if needed

export const createApiKey = async (containerId) => {
  try {
    const response = await apiKeyApi.post("/api-keys/", {
      container_id: containerId,
    });
    return response.data; // { message, api_key, container_id }
  } catch (error) {
    console.error("Error creating API key:", error.response?.data || error);
    throw error;
  }
};

export const deleteApiKey = async (apiKeyId) => {
  try {
    const response = await apiKeyApi.delete(`/api-keys/${apiKeyId}`);
    return response.data; // { message }
  } catch (error) {
    console.error("Error deleting API key:", error.response?.data || error);
    throw error;
  }
};

export const getApiKeysByContainer = async (containerId) => {
  try {
    const response = await apiKeyApi.get(`/api-keys/${containerId}`);
    return response.data; // { message, api_keys: [{ id, key }] }
  } catch (error) {
    console.error("Error fetching API keys:", error.response?.data || error);
    throw error;
  }
};
