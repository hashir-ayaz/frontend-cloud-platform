import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

// Ports Management Component
const ContainerPorts = ({
  ports,
  setPorts,
}: {
  ports: Array<number>;
  setPorts: (ports: Array<number>) => void;
}) => {
  const addPort = () => {
    setPorts([...ports, 0]); // Add a default port value of 0
  };

  const removePort = (index: number) => {
    setPorts(ports.filter((_, i) => i !== index));
  };

  const updatePort = (index: number, value: string) => {
    const portNumber = parseInt(value, 10);

    if (!isNaN(portNumber) && portNumber >= 1 && portNumber <= 65535) {
      const newPorts = [...ports];
      newPorts[index] = portNumber;
      setPorts(newPorts);
    } else if (value === "") {
      // Allow clearing the input
      const newPorts = [...ports];
      newPorts[index] = 0;
      setPorts(newPorts);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-white">
          Container Ports
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={addPort}
          className="flex items-center gap-2 text-black"
        >
          <Plus className="w-4 h-4" /> Add Port
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ports.map((port, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Port (1-65535)"
                  value={port === 0 ? "" : port.toString()}
                  onChange={(e) => updatePort(index, e.target.value)}
                  className="w-full text-black"
                  type="number"
                  min="1"
                  max="65535"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removePort(index)}
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

export default ContainerPorts;
