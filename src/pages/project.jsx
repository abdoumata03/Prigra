import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router";
import ProfileContext from "../context/profile-context";
import EmptyProject from "./empty_project";
import MyProjectInfo from "./my-project-info";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "../components/breadcrumbs";
import ProjectDashboard from "./project-dashboard";
import PhaseContext from "../context/phase-context";
import Refused from "../components/projet-refuse";

const Project = () => {
  const { hasProject, projectData } = useContext(ProfileContext);
  const { currentPhase } = useContext(PhaseContext);

  const status = projectData?.status_reponse?.toLowerCase();

  const location = useLocation();

  console.log(currentPhase);

  const renderContent = () => {
    if (location?.pathname.includes("edit")) {
      return <Outlet />;
    }

    if (projectData?.reponse === "ACCEPTÉ") {
      return <ProjectDashboard />;
    }

    if (projectData?.reponse === "REJETÉ") {
      return <Refused />;
    }

    if (!hasProject && currentPhase.includes("soumission")) {
      return <EmptyProject />;
    }

    if (hasProject && currentPhase.includes("validation")) {
      return <MyProjectInfo />;
    }
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
