import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getContainerById } from "@/service/containerService";
import { ContainerDetails } from "@/types/types";

const API_BASE_URL = "https://hashirayaz.site/api/deploy";

const ContainerDetailView = () => {
  const { containerId } = useParams<{ containerId: string }>();
  const [container, setContainer] = useState<ContainerDetails | null>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContainerDetails();
  }, [containerId]);

  const fetchContainerDetails = async () => {
    setLoading(true);
    if (!containerId) {
      alert("Container ID not found");
      return;
    }
    try {
      const res = await getContainerById(containerId);
      setContainer(res);
    } catch {
      toast({
        title: "Failed to fetch container details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stopContainer = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/container/${containerId}/stop`);
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
      await axios.delete(`${API_BASE_URL}/container/${containerId}`);
      toast({ title: "Container deleted successfully!", variant: "default" });
      setContainer(null);
    } catch {
      toast({ title: "Failed to delete container", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !container) {
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
          Container Details - {container.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-white">Status:</p>
            <Badge
              variant={
                container.status === "running" ? "default" : "destructive"
              }
              className="capitalize"
            >
              {container.status}
            </Badge>
          </div>

          {/* Model Info */}
          <div className="p-4 bg-gray-800 border rounded-md">
            <p className="font-semibold text-white text-md">
              Model Information
            </p>
            <p className="text-sm text-gray-400">
              Name: {container.model_name}
            </p>
            <p className="text-sm text-gray-400">
              Description: {container.model_description}
            </p>
            <p className="text-sm text-gray-400">
              Docker Image: {container.docker_image}
            </p>
          </div>

          {/* Assigned Ports */}
          <div className="p-4 bg-gray-800 border rounded-md">
            <p className="font-semibold text-white text-md">Assigned Ports</p>
            {container.ports.length > 0 ? (
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
          <div className="p-4 bg-gray-800 border rounded-md">
            <p className="font-semibold text-white text-md">
              Environment Variables
            </p>
            {Object.keys(container.config.environment || {}).length > 0 ? (
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

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            {container.status === "running" && (
              <Button
                variant="outline"
                size="sm"
                onClick={stopContainer}
                className="text-black"
              >
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
