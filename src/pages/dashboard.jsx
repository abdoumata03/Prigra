import React from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex flex-row bg-gray-50 font-eudox">
      <Sidebar />
      <div className="w-full flex items-center">
        <Outlet/>
      </div>
    </div>
  );
};

export default Dashboard;
