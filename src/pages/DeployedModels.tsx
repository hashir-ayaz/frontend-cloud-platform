import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getContainersByUserId } from "../service/containerService"; // Import the service function

interface Container {
  id: string;
  user_id: number;
  available_model_id: number;
  status: string;
  config: Record<string, any>;
  created_at: string;
  model_name?: string; // Optional for displaying the model name
}

const DeployedModels: React.FC = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = 1; // Replace with dynamic user ID as needed

  useEffect(() => {
    const fetchContainers = async () => {
      setLoading(true);
      try {
        const data = await getContainersByUserId(userId); // Fetch containers for the specific user
        setContainers(data);
      } catch (error) {
        console.error("Error fetching deployed containers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContainers();
  }, [userId]);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Deployed Containers</h1>

      {loading ? (
        <p>Loading containers...</p>
      ) : containers.length === 0 ? (
        <p>No containers deployed.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Container ID</TableHead>
              <TableHead>Model Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {containers.map((container) => (
              <TableRow key={container.id}>
                <TableCell>{container.id}</TableCell>
                <TableCell>{container.model_name || "Unknown"}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      container.status === "running"
                        ? "bg-green-200 text-green-800"
                        : container.status === "stopped"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {container.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(container.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Logs
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DeployedModels;
