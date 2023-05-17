import React, { useContext, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router";
import ProfileContext from "../context/profile-context";
import ProjectContext from "../context/project-context";
import { useLocation } from "react-router";

const Dashboard = () => {
  const { fetch_user } = useContext(ProfileContext);
  const {fetch_projects} = useContext(ProjectContext);
  const location = useLocation();
  const deletedProject = location.state;

  useEffect(() => {
    fetch_user();
    fetch_projects();
  }, [deletedProject]);

  return (
    <div className="flex flex-row min-h-screen bg-white_bg font-eudox">
      <Sidebar />
      <div className="flex flex-col px-8 py-8 ml-[18%] w-full min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
