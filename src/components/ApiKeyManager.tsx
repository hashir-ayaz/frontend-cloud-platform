// import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
import { ApiKey } from "@/types/types";

interface ApiKeyManagerProps {
  containerId: string;
  apiKeys: ApiKey[];
  onGenerateApiKey: (containerId: string) => void;
  onDeleteApiKey: (apiKeyId: string) => void;
  loading: boolean;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({
  containerId,
  apiKeys = [],
  onGenerateApiKey,
  onDeleteApiKey,
  loading,
}) => {
  // const { toast } = useToast();

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-semibold text-white">
          API Key Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* API Key List */}
          <div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-white">API Keys</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onGenerateApiKey(containerId)}
                className="flex gap-2 items-center text-black"
                disabled={loading}
              >
                <Plus className="w-4 h-4" /> Generate API Key
              </Button>
            </div>

            {apiKeys.length > 0 ? (
              <div className="mt-2 space-y-2">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.id}
                    className="flex gap-4 items-center p-2 bg-gray-800 rounded-lg"
                  >
                    <Input
                      value={apiKey.key}
                      readOnly
                      className="w-full text-black"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteApiKey(apiKey.id)}
                      className="text-red-500"
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No API keys found for this container.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyManager;
