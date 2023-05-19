import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router";
import ProfileContext from "../context/profile-context";
import EmptyProject from "./empty_project";
import MyProjectInfo from "./my-project-info";
import BlueLoadingSpinner from "../components/spinner_blue";
import { LoadingData } from "../components/loading_data";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "../components/breadcrumbs";
import ProjectDashboard from "./project-dashboard";

const Project = () => {
  const { hasProject, isLoading } = useContext(ProfileContext);

  const location = useLocation();


  const suivi = true;

  const renderContent = () => {
    if (location?.pathname.includes("edit")) {
      return <Outlet />;
    }

    if(suivi) {
      return <ProjectDashboard/>;
    }

    if (!hasProject) {
      return <EmptyProject />;
    }

    return <MyProjectInfo />;
  };

  return (
    <div className="flex flex-col justify-start items-start w-full flex-grow">
      <Toaster position="top-center" reverseOrder={false} />
      <Breadcrumbs />
      {renderContent()}
    </div>
  );
};

export default Project;
