import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// This would typically come from an API or database
const deployedModels = [
  { id: 1, name: "Model A", status: "Active", lastDeployed: "2023-05-15" },
  { id: 2, name: "Model B", status: "Inactive", lastDeployed: "2023-05-10" },
  { id: 3, name: "Model C", status: "Active", lastDeployed: "2023-05-20" },
];

export default function DeployedModelsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Deployed Models</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {deployedModels.map((model) => (
          <Card key={model.id}>
            <CardHeader>
              <CardTitle>{model.name}</CardTitle>
              <CardDescription>Status: {model.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Last deployed: {model.lastDeployed}
              </p>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
