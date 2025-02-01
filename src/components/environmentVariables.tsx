import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EnvVar } from "@/types/types"; // Import the EnvVar type

// Environment Variables Component
const EnvironmentVariables = ({
  envVars,
  setEnvVars,
}: {
  envVars: Array<EnvVar>; // Use EnvVar type here
  setEnvVars: (vars: Array<EnvVar>) => void; // Use EnvVar type here
}) => {
  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const removeEnvVar = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const updateEnvVar = (index: number, field: keyof EnvVar, value: string) => {
    const newEnvVars = [...envVars];
    newEnvVars[index][field] = value;
    setEnvVars(newEnvVars);
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-white">
          Environment Variables
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={addEnvVar}
          className="flex items-center gap-2 text-black"
        >
          <Plus className="w-4 h-4 " /> Add Variable
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
                  className="w-full text-black"
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Value"
                  value={envVar.value}
                  onChange={(e) => updateEnvVar(index, "value", e.target.value)}
                  className="w-full text-black"
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

export default EnvironmentVariables;
