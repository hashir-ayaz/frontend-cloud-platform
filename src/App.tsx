import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateModelPage from "./pages/CreateModel";
import DeployedModels from "./pages/DeployedModels";
import Dashboard from "./pages/Dashboard";
import ContainerDetailView from "./pages/ContainerDetailView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="create-model" element={<CreateModelPage />} />
        <Route path="deployed-models" element={<DeployedModels />} />
      </Route>
        <Route path="/containers/:containerId" element={<ContainerDetailView />} />
    </Routes>
  );
}
