import React, { useState } from "react";
import { MenuIcon } from "lucide-react";
import Sidebar from "../components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex overflow-hidden flex-col flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard
              </h1>
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>
        <main className="overflow-y-auto overflow-x-hidden flex-1 bg-gray-100">
          <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
