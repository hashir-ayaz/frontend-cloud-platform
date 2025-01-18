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
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transition duration-300 ease-in-out transform md:relative md:translate-x-0`}
    >
      <div className="flex justify-between items-center p-4">
        <span className="text-2xl font-semibold">Admin Panel</span>
        <button onClick={closeSidebar} className="md:hidden">
          <XIcon className="w-6 h-6" />
        </button>
      </div>
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
    </div>
  );
};

export default Sidebar;
