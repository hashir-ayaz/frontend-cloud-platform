import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { APIKey } from "../types/apiKey";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { getAvailableModels, deployModel } from "../service/containerService";
import EnvironmentVariables from "../components/environmentVariables";

const CreateModelPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [availableModels, setAvailableModels] = useState<
    Array<{
      id: number;
      name: string;
      description: string;
      docker_image: string;
      version: string;
    }>
  >([]);
  const [containerName, setContainerName] = useState("");
  const [envVars, setEnvVars] = useState<Array<{ key: string; value: string }>>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const models = await getAvailableModels();
        setAvailableModels(models);
      } catch (error) {
        console.error("Failed to fetch available models:", error);
      }
    };

    fetchModels();
  }, []);

  const handleDeploy = async () => {
    if (!selectedModel || !containerName) return;

    setLoading(true);
    try {
      const selectedModelData = availableModels.find(
        (m) => m.id.toString() === selectedModel
      );
      if (!selectedModelData) return;

      const environment = Object.fromEntries(
        envVars.filter((v) => v.key && v.value).map((v) => [v.key, v.value])
      );

      const response = await deployModel(
        parseInt(selectedModel),
        environment,
        containerName
      );

      console.log("Deployment successful:", response);

      setContainerName("");
      setSelectedModel("");
      setEnvVars([]);
    } catch (error) {
      console.error("Deployment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">Deploy Container</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="containerName">Container Name</Label>
              <Input
                id="containerName"
                className="w-full text-black"
                placeholder="My-Yummy-Container!"
                value={containerName}
                onChange={(e) => setContainerName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelSelect">Select Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="modelSelect" className="w-full text-black">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.id} value={model.id.toString()}>
                      {model.name} ({model.version})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedModel && (
                <p className="text-sm text-gray-500">
                  {
                    availableModels.find(
                      (m) => m.id.toString() === selectedModel
                    )?.description
                  }
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <EnvironmentVariables envVars={envVars} setEnvVars={setEnvVars} />

      <div className="flex justify-end mt-6">
        <Button
          onClick={handleDeploy}
          disabled={!selectedModel || !containerName || loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            "Deploying..."
          ) : (
            <>
              <PlusCircle className="w-4 h-4" /> Deploy Container
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateModelPage;
