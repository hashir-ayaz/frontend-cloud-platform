import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateModelPage from "./pages/CreateModel";
import DeployedModels from "./pages/DeployedModels";
import Dashboard from "./pages/Dashboard";
import ContainerDetailView from "./pages/ContainerDetailView";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="create-model" element={<CreateModelPage />} />
        <Route path="deployed-models" element={<DeployedModels />} />
        <Route path="containers/:containerId" element={<ContainerDetailView />} /> 
      </Route>
    </Routes>
  );
}
