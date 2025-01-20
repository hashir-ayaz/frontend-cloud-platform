import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Plus, X } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAvailableModels } from "../service/containerService";

// Environment Variables Component
const EnvironmentVariables = ({
  envVars,
  setEnvVars,
}: {
  envVars: Array<{ key: string; value: string }>;
  setEnvVars: (vars: Array<{ key: string; value: string }>) => void;
}) => {
  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const removeEnvVar = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const updateEnvVar = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newEnvVars = [...envVars];
    newEnvVars[index][field] = value;
    setEnvVars(newEnvVars);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Environment Variables
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={addEnvVar}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Variable
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {envVars.map((envVar, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Key"
                  value={envVar.key}
                  onChange={(e) => updateEnvVar(index, "key", e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Value"
                  value={envVar.value}
                  onChange={(e) => updateEnvVar(index, "value", e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEnvVar(index)}
                className="text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Create Model Page Component
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

      const deploymentData = {
        available_model_id: parseInt(selectedModel),
        config: {
          container_name: containerName,
          environment: Object.fromEntries(
            envVars.filter((v) => v.key && v.value).map((v) => [v.key, v.value])
          ),
        },
      };

      // TODO: Add your deployment API call here
      console.log("Deploying container with data:", deploymentData);

      // Reset form after successful deployment
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
      <h1 className="mb-6 text-2xl font-bold">Deploy Container</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="containerName">Container Name</Label>
              <Input
                id="containerName"
                placeholder="Enter container name"
                value={containerName}
                onChange={(e) => setContainerName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelSelect">Select Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="modelSelect" className="w-full">
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
