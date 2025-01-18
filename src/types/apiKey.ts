export interface APIKey {
  id: string;
  name: string;
  model: string;
  status: "active" | "inactive";
  createdAt: string;
}
