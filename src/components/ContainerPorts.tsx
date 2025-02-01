import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

interface Port {
  port: number;
  protocol: "tcp" | "udp";
}

const ContainerPorts = ({
  ports,
  setPorts,
}: {
  ports: Port[];
  setPorts: (ports: Port[]) => void;
}) => {
  const addPort = () => {
    setPorts([...ports, { port: 0, protocol: "tcp" }]); // Default new port entry
  };

  const removePort = (index: number) => {
    setPorts(ports.filter((_, i) => i !== index));
  };

  const updatePort = (index: number, value: string) => {
    const portNumber = parseInt(value, 10);
    if (!isNaN(portNumber) && portNumber >= 1 && portNumber <= 65535) {
      const newPorts = [...ports];
      newPorts[index].port = portNumber;
      setPorts(newPorts);
    }
  };

  const updateProtocol = (index: number, protocol: "tcp" | "udp") => {
    const newPorts = [...ports]; // Create a copy of the current ports
    newPorts[index].protocol = protocol; // Update the protocol for the specific port
    setPorts(newPorts); // Set the new ports array
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
          {ports.map((entry, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Port (1-65535)"
                  value={entry.port === 0 ? "" : entry.port.toString()}
                  onChange={(e) => updatePort(index, e.target.value)}
                  className="w-full text-black"
                  type="number"
                  min="1"
                  max="65535"
                />
              </div>
              <div className="flex-1">
                <Select
                  value={entry.protocol}
                  onValueChange={(value) =>
                    updateProtocol(index, value as "tcp" | "udp")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tcp">TCP</SelectItem>
                    <SelectItem value="udp">UDP</SelectItem>
                  </SelectContent>
                </Select>
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
