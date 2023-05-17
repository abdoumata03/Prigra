import React, { useContext, useEffect } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router";
import ProfileContext from "../context/profile-context";
import ProjectContext from "../context/project-context";
import PhaseContext from "../context/phase-context";
import { useLocation } from "react-router";
import BlueLoadingSpinner from "../components/spinner_blue";

const Dashboard = () => {
  const { fetch_user, isLoading } = useContext(ProfileContext);
  const { fetch_projects } = useContext(ProjectContext);
  const { fetch_phases } = useContext(PhaseContext);
  const location = useLocation();
  const deletedProject = location.state;

  useEffect(() => {
    fetch_user();
    fetch_phases();
    fetch_projects();
  }, [deletedProject]);

  return (
    <div className="flex flex-row min-h-screen bg-white_bg  font-eudox">
      <Sidebar />
      {isLoading ? (
        <div className="flex flex-col px-8 py-8 w-full min-h-screen">
          <div className="flex flex-row gap-3 h-full justify-center items-center">
            <BlueLoadingSpinner />
            <p className="text-md text-gray3">
              Nous préparons vos données, merci de patienter...
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-8 py-8 w-full ml-[18%] min-h-screen">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
