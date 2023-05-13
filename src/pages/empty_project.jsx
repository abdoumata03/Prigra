import React, { useContext } from "react";
import { ReactComponent as AddProject } from "../assets/illustrations/add_project.svg";
import ProjectContext from "../context/project-context";

const EmptyProject = () => {
  const { createProject } = useContext(ProjectContext);

  return (
    <div className="flex flex-col items-center justify-center">
      <AddProject />
      <h1 className="text-xl font-bold text-gray1 text-center mb-5 mt-10">
        Vous n'avez pas encore ajouté un projet
      </h1>
      <p className="text-sm text-gray3 text-center mb-10">
        Il semble que vous n'ayez pas encore ajouté de projets. <br /> Cliquez
        sur le bouton ci-dessous pour commencer à ajouter votre premier projet
      </p>
      <button onClick={createProject} className="rounded-[5px] text-white font-semibold bg-primary h-12 px-8">
        Ajouter un projet
      </button>
    </div>
  );
};

export default EmptyProject;
