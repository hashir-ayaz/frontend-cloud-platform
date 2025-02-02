import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  getContainerById,
  stopContainerById,
  deleteContainerById,
} from "@/service/containerService";
import {
  createApiKey,
  deleteApiKey,
  getApiKeysByContainer,
} from "@/service/apiKeyService";
import { ContainerDetails, ApiKey } from "@/types/types";
import ApiKeyManager from "@/components/ApiKeyManager";

// Default container structure
const defaultContainer: ContainerDetails = {
  id: "",
  user_id: 0,
  name: "Unknown",
  available_model_id: 0,
  status: "stopped",
  model_name: "N/A",
  model_description: "No description available.",
  docker_image: "N/A",
  ports: [],
  config: { environment: {} },
  created_at: new Date().toISOString(),
  api_keys: [],
};

const ContainerDetailView = () => {
  const { containerId } = useParams<{ containerId: string }>();
  const [container, setContainer] =
    useState<ContainerDetails>(defaultContainer);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (containerId) {
      fetchContainerDetails();
    }
  }, [containerId]);

  const fetchContainerDetails = async () => {
    setLoading(true);
    try {
      const res = await getContainerById(containerId ?? "");
      const apiKeys = await getApiKeysByContainer(containerId ?? "");
      setContainer({
        ...(res || defaultContainer),
        api_keys: apiKeys.api_keys,
      });
    } catch {
      toast({
        title: "Failed to fetch container details",
        variant: "destructive",
      });
      setContainer(defaultContainer);
    } finally {
      setLoading(false);
    }
  };

  const stopContainer = async () => {
    setLoading(true);
    try {
      await stopContainerById(containerId ?? "");
      toast({ title: "Container stopped successfully!", variant: "default" });
      fetchContainerDetails();
    } catch {
      toast({ title: "Failed to stop container", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const deleteContainer = async () => {
    setLoading(true);
    try {
      await deleteContainerById(containerId ?? "");
      toast({ title: "Container deleted successfully!", variant: "default" });
      setContainer(defaultContainer);
    } catch {
      toast({ title: "Failed to delete container", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Generate API Key
  const generateApiKeyHandler = async () => {
    setLoading(true);
    try {
      const newKey = await createApiKey(containerId ?? "");
      toast({
        title: "API Key Created",
        description: `Key: ${newKey.api_key}`,
        variant: "default",
      });
      fetchContainerDetails();
    } catch {
      toast({ title: "Failed to create API key", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Delete API Key
  const deleteApiKeyHandler = async (apiKeyId: string) => {
    setLoading(true);
    try {
      await deleteApiKey(apiKeyId);
      toast({ title: "API Key deleted successfully!", variant: "default" });
      fetchContainerDetails();
    } catch {
      toast({ title: "Failed to delete API key", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      </div>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">
          Container Details - {container?.name || "Unknown"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status */}
          <div className="flex gap-2 items-center">
            <p className="text-sm font-medium text-white">Status:</p>
            <Badge
              variant={
                container?.status === "running" ? "default" : "destructive"
              }
              className="capitalize"
            >
              {container?.status || "Unknown"}
            </Badge>
          </div>

          {/* Model Info */}
          <div className="p-4 bg-gray-800 rounded-md border">
            <p className="font-semibold text-white text-md">
              Model Information
            </p>
            <p className="text-sm text-gray-400">
              Name: {container?.model_name || "N/A"}
            </p>
            <p className="text-sm text-gray-400">
              Description:{" "}
              {container?.model_description || "No description available."}
            </p>
            <p className="text-sm text-gray-400">
              Docker Image: {container?.docker_image || "N/A"}
            </p>
          </div>

          {/* Assigned Ports */}
          <div className="p-4 bg-gray-800 rounded-md border">
            <p className="font-semibold text-white text-md">Assigned Ports</p>
            {container?.ports?.length > 0 ? (
              <ul className="text-sm text-gray-400">
                {container.ports.map((port, index) => (
                  <li key={index}>
                    Host: {port.host_port} → Container: {port.container_port} (
                    {port.protocol})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No ports assigned.</p>
            )}
          </div>

          {/* Environment Variables */}
          <div className="p-4 bg-gray-800 rounded-md border">
            <p className="font-semibold text-white text-md">
              Environment Variables
            </p>
            {container?.config?.environment &&
            Object.keys(container.config.environment).length > 0 ? (
              <ul className="text-sm text-gray-400">
                {Object.entries(container.config.environment).map(
                  ([key, value]) => (
                    <li key={key}>
                      {key}: <span className="text-gray-300">{value}</span>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">
                No environment variables set.
              </p>
            )}
          </div>

          {/* API Keys Section */}
          <div>
            <ApiKeyManager
              apiKeys={container.api_keys ?? []}
              containerId={container.id}
              onGenerateApiKey={generateApiKeyHandler}
              onDeleteApiKey={deleteApiKeyHandler}
              loading={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            {container?.status === "running" && (
              <Button
                variant="outline"
                size="sm"
                onClick={stopContainer}
                className="text-black"
              >
                <StopCircle className="mr-2 w-4 h-4" />
                Stop
              </Button>
            )}
            <Button variant="destructive" size="sm" onClick={deleteContainer}>
              <Trash2 className="mr-2 w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerDetailView;
