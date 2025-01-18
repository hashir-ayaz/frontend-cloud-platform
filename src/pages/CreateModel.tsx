import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateModelPage() {
  const [modelName, setModelName] = useState("");
  const [modelDescription, setModelDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the model creation and deployment
    console.log("Creating and deploying model:", {
      modelName,
      modelDescription,
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-6 text-2xl font-bold">Create and Deploy New Model</h2>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Model Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modelName">Model Name</Label>
              <Input
                id="modelName"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modelDescription">Model Description</Label>
              <Textarea
                id="modelDescription"
                value={modelDescription}
                onChange={(e) => setModelDescription(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Create and Deploy Model
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
