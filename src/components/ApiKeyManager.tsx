import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const API_BASE_URL = "https://hashirayaz.site/api/api-keys";

interface ApiKey {
  id: string;
  key: string;
  container_id: string;
}

const ApiKeyManager = () => {
  const [containers, setContainers] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch containers for the dropdown (Modify this according to your backend)
  useEffect(() => {
    axios.get("https://hashirayaz.site/api/containers")
      .then((res) => setContainers(res.data))
      .catch(() => toast({ title: "Failed to fetch containers", variant: "destructive" }));
  }, []);

  // Fetch API keys when a container is selected
  useEffect(() => {
    if (!selectedContainer) return;

    setLoading(true);
    axios.get(`${API_BASE_URL}/${selectedContainer}`)
      .then((res) => setApiKeys(res.data.api_keys.map((key: string) => ({ id: key, key, container_id: selectedContainer }))))
      .catch(() => toast({ title: "Failed to fetch API keys", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [selectedContainer]);

  // Generate a new API Key
  const generateApiKey = async () => {
    if (!selectedContainer) {
      toast({ title: "Select a container first", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/create`, { container_id: selectedContainer });
      setApiKeys([...apiKeys, { id: res.data.api_key, key: res.data.api_key, container_id: selectedContainer }]);
      toast({ title: "API Key created successfully!", variant: "success" });
    } catch {
      toast({ title: "Failed to create API key", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Delete an API Key
  const deleteApiKey = async (apiKeyId: string) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/delete/${apiKeyId}`);
      setApiKeys(apiKeys.filter((key) => key.id !== apiKeyId));
      toast({ title: "API Key deleted successfully!", variant: "success" });
    } catch {
      toast({ title: "Failed to delete API key", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-white">API Key Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Container Selection Dropdown */}
          <Select onValueChange={setSelectedContainer}>
            <SelectTrigger>
              <SelectValue placeholder="Select a container" />
            </SelectTrigger>
            <SelectContent>
              {containers.map((container) => (
                <SelectItem key={container.id} value={container.id}>
                  {container.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* API Key List */}
          {selectedContainer && (
            <div>
              <div className="flex justify-between items-center">
                <p className="text-white text-sm">API Keys</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateApiKey}
                  className="flex items-center gap-2 text-black"
                  disabled={loading}
                >
                  <Plus className="w-4 h-4" /> Generate API Key
                </Button>
              </div>

              {apiKeys.length > 0 ? (
                <div className="mt-2 space-y-2">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="flex items-center gap-4 p-2 bg-gray-800 rounded-lg">
                      <Input value={apiKey.key} readOnly className="text-black w-full" />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="text-red-500"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No API keys found for this container.</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager;
