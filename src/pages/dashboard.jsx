import React, { useContext, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router";
import ProfileContext from "../context/profile-context";
import ProjectContext from "../context/project-context";

const Dashboard = () => {
  const { fetch_user } = useContext(ProfileContext);
  const {fetch_Projects} = useContext(ProjectContext)

  useEffect(() => {
    fetch_user();
    fetch_Projects();
  }, []);

  return (
    <div className="flex flex-row min-h-screen bg-white_bg font-eudox">
      <Sidebar />
      <div className="flex justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
