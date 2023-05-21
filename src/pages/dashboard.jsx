import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router";
import ProfileContext from "../context/profile-context";
import ProjectContext from "../context/project-context";
import { useLocation } from "react-router";
import BlueLoadingSpinner from "../components/spinner_blue";
import Lottie from "lottie-react";
import Paperplane from "../assets/lottie/paperplane.json";

const Dashboard = () => {
  const { fetch_user } = useContext(ProfileContext);
  const { fetch_projects } = useContext(ProjectContext);
  const location = useLocation();
  const deletedProject = location.state;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    console.log('HERE');
    fetch_user();
=======
    (async () => {
      setIsLoading(true);
      await fetch_user();
      setIsLoading(false);
    })();
    fetch_phases();
>>>>>>> a024241 (file sumbmission)
    fetch_projects();
  }, [deletedProject]);

  return isLoading ? (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Lottie animationData={Paperplane} loop={true} />
    </div>
  ) : (
    <div className="flex flex-row min-h-screen bg-white_bg  font-eudox">
      <Sidebar />
      <div className="flex flex-col px-8 py-8 w-full ml-[18%] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
