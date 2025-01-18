import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex overflow-hidden flex-col flex-1">
        <Header />
        <main className="overflow-y-auto overflow-x-hidden flex-1 p-6 bg-gray-100">
          {/* Content will be rendered here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
