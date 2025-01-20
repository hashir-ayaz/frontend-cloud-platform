import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Welcome to your Dashboard
        </h2>
        <p className="text-gray-600">
          This is where you'll see an overview of your admin panel. You can add
          widgets, charts, and other components here.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
