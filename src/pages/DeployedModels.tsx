import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getContainersByUserId } from "../service/containerService";
import { useUserStore } from "@/store/useUserStore";
import { ContainerDetails } from "@/types/types"; // Import the new interface

const DeployedModels: React.FC = () => {
  const [containers, setContainers] = useState<ContainerDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = useUserStore((state) => state.currentUser?.id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContainers = async () => {
      if (!userId) return; // Exit early if userId is undefined

      setLoading(true);
      try {
        const data = await getContainersByUserId(userId);
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
              <TableHead>Container Name</TableHead>
              <TableHead>Container ID</TableHead>
              <TableHead>Model Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Mapped Ports</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {containers.map((container) => (
              <TableRow
                key={container.id}
                onClick={() => navigate(`/dashboard/containers/${container.id}`)}
                className="transition duration-150 ease-in-out cursor-pointer hover:bg-gray-100"
              >
                <TableCell>{container.name || "Unnamed"}</TableCell>
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
                  {container.ports?.length > 0 ? (
                    <ul>
                      {container.ports.map((port, index) => (
                        <li key={index}>
                          {port.host_port} ➝ {port.container_port} (
                          {port.protocol})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No ports mapped</span>
                  )}
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
