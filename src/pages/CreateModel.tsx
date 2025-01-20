import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { APIKey } from "../types/apiKey";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAvailableModels } from "../service/containerService"; // Import the service function

const CreateModelPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [availableModels, setAvailableModels] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]); // To store available models from the backend
  const [apis, setApis] = useState<APIKey[]>([
    {
      id: "1",
      name: "API 1",
      model: "GPT-3",
      status: "active",
      createdAt: "2023-06-01",
    },
    {
      id: "2",
      name: "API 2",
      model: "BERT",
      status: "inactive",
      createdAt: "2023-06-15",
    },
  ]);

  useEffect(() => {
    // Fetch available models when the component mounts
    const fetchModels = async () => {
      try {
        const models = await getAvailableModels();
        setAvailableModels(
          models.map((model) => ({ id: model.id, name: model.name }))
        );
      } catch (error) {
        console.error("Failed to fetch available models:", error);
      }
    };

    fetchModels();
  }, []);

  const handleDeploy = () => {
    if (selectedModel) {
      const newApi: APIKey = {
        id: (apis.length + 1).toString(),
        name: `API ${apis.length + 1}`,
        model: selectedModel,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setApis([...apis, newApi]);
      setSelectedModel("");
    }
  };

  const handleGenerateAPI = () => {
    console.log("Generating new API...");
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h1 className="mb-6 text-2xl font-bold">Create Model</h1>

      <div className="flex flex-col gap-4 mb-6 sm:flex-row">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.length > 0 ? (
              availableModels.map((model) => (
                <SelectItem key={model.id} value={model.name}>
                  {model.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled>No models available</SelectItem>
            )}
          </SelectContent>
        </Select>
        <Button onClick={handleDeploy} disabled={!selectedModel}>
          Deploy Model
        </Button>
      </div>

      <Button
        onClick={handleGenerateAPI}
        variant="outline"
        className="flex items-center gap-2"
      >
        <PlusCircle className="w-4 h-4" />
        Generate New API
      </Button>
    </div>
  );
};

export default CreateModelPage;
