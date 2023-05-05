import React from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex flex-row min-h-screen bg-gray-50 font-eudox">
      <Sidebar />
      <div className="flex items-center">
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
