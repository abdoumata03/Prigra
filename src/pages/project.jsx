import React, { useContext } from "react";
import { Outlet, useLocation } from "react-router";
import ProfileContext from "../context/profile-context";
import EmptyProject from "./empty_project";
import MyProjectInfo from "./my-project-info";
import BlueLoadingSpinner from "../components/spinner_blue";
import { LoadingData } from "../components/loading_data";
import { Toaster } from "react-hot-toast";
import Breadcrumbs from "../components/breadcrumbs";

const Project = () => {
  const { hasProject, isLoading } = useContext(ProfileContext);

  const location = useLocation();

  const renderContent = () => {
    if (location?.pathname.includes("add")) {
      return <Outlet />;
    }

    if (!hasProject) {
      return <EmptyProject />;
    }

    return <MyProjectInfo />;
  };

  return isLoading ? (
    <LoadingData />
  ) : (
    <div className="flex flex-col justify-start items-start w-full h-screen px-8 py-8">
      <Toaster position="top-center" reverseOrder={false} />
      <Breadcrumbs />
      {renderContent()}
    </div>
  );
};

export default Project;
