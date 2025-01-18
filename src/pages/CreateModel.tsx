import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { APIKey } from "../types/apiKey";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateModelPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
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
    // This would typically involve a backend call to generate a new API
    console.log("Generating new API...");
  };

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold">Create Model</h1>

      <div className="flex flex-col gap-4 mb-6 sm:flex-row">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-3">GPT-3</SelectItem>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="bert">BERT</SelectItem>
            <SelectItem value="t5">T5</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleDeploy} disabled={!selectedModel}>
          Deploy Model
        </Button>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Current Deployed Models</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apis.map((api) => (
              <TableRow key={api.id}>
                <TableCell>{api.name}</TableCell>
                <TableCell>{api.model}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      api.status === "active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {api.status}
                  </span>
                </TableCell>
                <TableCell>{api.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Button
        onClick={handleGenerateAPI}
        variant="outline"
        className="flex gap-2 items-center"
      >
        <PlusCircle className="w-4 h-4" />
        Generate New API
      </Button>
    </div>
  );
};

export default CreateModelPage;
