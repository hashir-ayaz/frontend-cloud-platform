import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getContainerById, stopContainerById, deleteContainerById } from "@/service/containerService";
import { ContainerDetails } from "@/types/types";

// Default container structure with required properties
const defaultContainer: ContainerDetails = {
  id: "",
  user_id: 0, // Added user_id
  name: "Unknown",
  available_model_id: 0, // Added available_model_id
  status: "stopped",
  model_name: "N/A",
  model_description: "No description available.",
  docker_image: "N/A",
  ports: [],
  config: {
    environment: {},
  },
  created_at: new Date().toISOString(), // Added created_at
};

const ContainerDetailView = () => {
  const { containerId } = useParams<{ containerId: string }>();
  const [container, setContainer] = useState<ContainerDetails>(defaultContainer);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (containerId) {
      fetchContainerDetails();
    }
  }, [containerId]);

  const fetchContainerDetails = async () => {
    setLoading(true);
    if (!containerId) {
      alert("Container ID not found");
      setLoading(false);
      return;
    }
    try {
      const res = await getContainerById(containerId);
      setContainer(res || defaultContainer);
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
      await stopContainerById(containerId ?? ""); // Ensure a string is passed
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
      await deleteContainerById(containerId ?? ""); // Ensure a string is passed
      toast({ title: "Container deleted successfully!", variant: "default" });
      setContainer(defaultContainer);
    } catch {
      toast({ title: "Failed to delete container", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
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
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-white">Status:</p>
            <Badge
              variant={container?.status === "running" ? "default" : "destructive"}
              className="capitalize"
            >
              {container?.status || "Unknown"}
            </Badge>
          </div>

          {/* Model Info */}
          <div className="p-4 bg-gray-800 border rounded-md">
            <p className="font-semibold text-white text-md">Model Information</p>
            <p className="text-sm text-gray-400">Name: {container?.model_name || "N/A"}</p>
            <p className="text-sm text-gray-400">Description: {container?.model_description || "No description available."}</p>
            <p className="text-sm text-gray-400">Docker Image: {container?.docker_image || "N/A"}</p>
          </div>

          {/* Assigned Ports */}
          <div className="p-4 bg-gray-800 border rounded-md">
            <p className="font-semibold text-white text-md">Assigned Ports</p>
            {container?.ports?.length > 0 ? (
              <ul className="text-sm text-gray-400">
                {container.ports.map((port, index) => (
                  <li key={index}>
                    Host: {port.host_port} → Container: {port.container_port} ({port.protocol})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No ports assigned.</p>
            )}
          </div>

          {/* Environment Variables */}
          <div className="p-4 bg-gray-800 border rounded-md">
            <p className="font-semibold text-white text-md">Environment Variables</p>
            {container?.config?.environment &&
            Object.keys(container.config.environment).length > 0 ? (
              <ul className="text-sm text-gray-400">
                {Object.entries(container.config.environment).map(([key, value]) => (
                  <li key={key}>
                    {key}: <span className="text-gray-300">{value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No environment variables set.</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            {container?.status === "running" && (
              <Button variant="outline" size="sm" onClick={stopContainer} className="text-black">
                <StopCircle className="w-4 h-4 mr-2" />
                Stop
              </Button>
            )}
            <Button variant="destructive" size="sm" onClick={deleteContainer}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerDetailView;
