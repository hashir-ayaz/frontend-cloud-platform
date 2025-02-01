export interface ApiKey {
  id: string;
  key: string;
  container_id: string;
  name?: string;
  status?: "active" | "inactive";
  createdAt?: string;
}

export interface ContainerDetails {
  id: string;
  user_id: number;
  available_model_id: number;
  name: string;
  status: "running" | "stopped" | "failed" | "pending";
  model_name: string;
  model_description: string;
  docker_image: string;
  ports: { host_port: number; container_port: number; protocol: string }[];
  config: { environment: Record<string, string> };
  created_at: string;
}

export interface Model {
  id: number;
  name: string;
  description?: string;
  docker_image: string;
  version: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface PortMapping {
  host_port: number;
  container_port: number;
  protocol: string;
}

export interface EnvVar {
  key: string;
  value: string;
}
