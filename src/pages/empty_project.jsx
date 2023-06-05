import React, { useContext, useState } from "react";
import { ReactComponent as AddProject } from "../assets/illustrations/add_project.svg";
import ProjectContext from "../context/project-context";
import { useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import LoadingSpinner from "../components/spinner";

const EmptyProject = () => {
  const { createProject } = useContext(ProjectContext);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setIsCreatingProject(true);
      await toast.promise(createProject(), {
        loading: "En train de créer un projet...",
        success: "Votre projet a été crée",
        error: "Erreur lors la création de votre projet...",
      });
      setIsCreatingProject(false);
      navigate("/project/edit", { forceRefresh: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Toaster position="top-center" reverseOrder={false} />
        <AddProject />
        <h1 className="text-xl font-bold text-gray1 text-center mb-5 mt-10">
          Vous n'avez pas encore ajouté un projet
        </h1>
        <p className="text-sm text-gray3 text-center mb-10">
          Il semble que vous n'ayez pas encore ajouté de projets. <br /> Cliquez
          sur le bouton ci-dessous pour commencer à ajouter votre premier projet
        </p>
        <button
          onClick={handleClick}
          className={`w-1/4 text-sm md:text-base h-[40px] md:h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[0.4rem] text-white font-semibold ${
            isCreatingProject ? "bg-opacity-75" : "bg-opacity-100"
          }`}
          disabled={isCreatingProject}
        >
          {isCreatingProject ? <LoadingSpinner /> : "Ajouter un projet"}
        </button>
      </div>
    </>
  );
};

export default EmptyProject;
