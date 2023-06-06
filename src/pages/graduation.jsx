import React, { useContext } from "react";
import Breadcrumbs from "../components/breadcrumbs";
import InfoSoutenance from "../components/info-soutenace";
import ProfileContext from "../context/profile-context";
import PreSoutenance from "../components/pre-soutenance";
import ProjectSoutenances from "../components/projets-soutenance";
import { Outlet, useLocation } from "react-router";
import SoutenancePending from "../components/soutenance-pending";
import NoValidProject from "../components/no-valid-project";

const Graduation = () => {
  const { userInitialData, projectData, userData } = useContext(ProfileContext);

  const location = useLocation();

  function isPdp() {
    if (userInitialData?.type === "Student") {
      return true;
    }

    if (userInitialData?.type === "Teacher") {
      const isTeacherPdp =
        userData?.is_comite_scientifique_incubateur === false &&
        userData?.is_encadrant === false &&
        userData?.is_jury === false;
      if (isTeacherPdp) {
        return true;
      }
    }
  }

  console.log(projectData?.status_reponse.toLowerCase());
  function renderContent() {
    if (isPdp() && userData?.project_id) {
      if (projectData?.is_authorized && projectData?.soutenance) {
        return <InfoSoutenance />;
      } else if (projectData?.is_authorized && !projectData?.soutenance) {
        return <SoutenancePending />;
      }
      if (
        projectData?.status_reponse.toLowerCase() === "en_cours" ||
        projectData?.status_reponse.toLowerCase() === "soumission"
      ) {
        return <NoValidProject />;
      } else if (projectData?.status_reponse.toLowerCase() === "validé") {
        return <PreSoutenance />;
      }
    } else if (isPdp() && !userData?.project_id) {
      return <NoValidProject />;
    }
    return location?.pathname.includes("soutenances/project") ? (
      <Outlet />
    ) : (
      <ProjectSoutenances />
    );
  }

  return (
    <>
      {console.log(isPdp())}
      <Breadcrumbs />
      {renderContent()}
    </>
  );
};

export default Graduation;
