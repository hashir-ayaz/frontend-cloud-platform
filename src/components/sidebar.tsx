import React from "react";
import { XIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:block`}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <span className="text-2xl font-semibold">Admin Panel</span>
        <button
          onClick={closeSidebar}
          className="p-1 rounded md:hidden hover:bg-gray-700"
          aria-label="Close Sidebar"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-8">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/dashboard/create-model">Create Model</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link to="/dashboard/deployed-models">Deployed Models</Link>
          </li>
        </ul>
      </nav>

      {/* Footer Close Button */}
      <div className="p-4 mt-auto">
        <button
          onClick={closeSidebar}
          className="px-4 py-2 w-full text-sm bg-red-600 rounded-md hover:bg-red-700"
        >
          Close Sidebar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
