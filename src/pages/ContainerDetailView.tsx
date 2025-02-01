import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, StopCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = "https://hashirayaz.site/api/deploy";

interface ContainerDetails {
  id: string;
  user_id: number;
  name: string;
  available_model_id: number;
  model_name: string;
  model_description: string;
  docker_image: string;
  status: "running" | "stopped" | "failed" | "pending";
  ports: { host_port: number; container_port: number; protocol: string }[];
  config: { environment: Record<string, string> };
  created_at: string;
}

const ContainerDetailView = () => {
  const { containerId } = useParams();
  const [container, setContainer] = useState<ContainerDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContainerDetails();
  }, [containerId]);

  const fetchContainerDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/container/${containerId}`);
      setContainer(res.data);
    } catch {
      toast({ title: "Failed to fetch container details", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const stopContainer = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/container/${containerId}/stop`);
      toast({ title: "Container stopped successfully!", variant: "success" });
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
      toast({ title: "Container deleted successfully!", variant: "success" });
      setContainer(null);
    } catch {
      toast({ title: "Failed to delete container", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !container) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-white" />
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
              variant={container.status === "running" ? "success" : "destructive"}
              className="capitalize"
            >
              {container.status}
            </Badge>
          </div>

          {/* Model Info */}
          <div className="border rounded-md p-4 bg-gray-800">
            <p className="text-md font-semibold text-white">Model Information</p>
            <p className="text-sm text-gray-400">Name: {container.model_name}</p>
            <p className="text-sm text-gray-400">Description: {container.model_description}</p>
            <p className="text-sm text-gray-400">Docker Image: {container.docker_image}</p>
          </div>

          {/* Assigned Ports */}
          <div className="border rounded-md p-4 bg-gray-800">
            <p className="text-md font-semibold text-white">Assigned Ports</p>
            {container.ports.length > 0 ? (
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
          <div className="border rounded-md p-4 bg-gray-800">
            <p className="text-md font-semibold text-white">Environment Variables</p>
            {Object.keys(container.config.environment || {}).length > 0 ? (
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
            {container.status === "running" && (
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
