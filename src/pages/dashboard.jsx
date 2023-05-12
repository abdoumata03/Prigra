import React, { useContext, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router";
import ProfileContext from "../context/profile-context";

const Dashboard = () => {
  const { fetch_user } = useContext(ProfileContext);

  useEffect(() => {
    fetch_user();
  }, []);

  return (
    <div className="flex flex-row min-h-screen bg-white_bg font-eudox">
      <Sidebar />
      <div className="flex items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
