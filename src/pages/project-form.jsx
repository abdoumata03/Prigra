import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { ReactComponent as Check } from "../assets/icons/check.svg";
import ChooseProjectType from "../components/project-choose-type";
import ProjectInfo from "../components/project-info";
import ProjectThirdStep from "../components/project-members";
import ProjectLastStep from "../components/project-confirmation";
import ProjectContext from "../context/project-context";
import ProfileContext from "../context/profile-context";
import EmptyProject from "./empty_project";
import BlueLoadingSpinner from "../components/spinner_blue";
import LoadingSpinner from "../components/spinner";

const ProjectForm = () => {
  const steps = [
    "Type de projet",
    "Information de projet",
    "Membres de l'équipe",
    "Validation",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { putProjectType, type } = useContext(ProjectContext);
  const {
    isLoading,
    hasProject,
    projectData,
    fetch_project,
    isProjectLoading,
  } = useContext(ProfileContext);

  const infoFormRef = useRef();

  const handleNext = async () => {
    if (activeStep === 1) {
      infoFormRef.current?.click();
    }

    console.log(type);
    console.log(projectData?.type);

    if (activeStep === 0 && type !== projectData?.type) {
      putProjectType();
      await fetch_project();
    }

    if (activeStep === steps.length - 1) {
      setIsComplete(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isNotFirstStep = () => {
    return activeStep > 0 && activeStep <= steps.length;
  };

  const stepContent = () => {
    switch (activeStep) {
      case 0:
        return <ChooseProjectType />;
      case 1:
        return <ProjectInfo innerRef={infoFormRef} />;
      case 2:
        return <ProjectThirdStep />;
      case 3:
        return <ProjectLastStep />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-row gap-3 justify-center items-center">
        <BlueLoadingSpinner />
        <p className="text-md text-gray3">
          Nous préparons vos données, merci de patienter...
        </p>
      </div>
    );
  } else {
    return !hasProject ? (
      <EmptyProject />
    ) : (
      <div className="w-[90%] h-full pt-16 pb-14 flex flex-col">
        <div className="flex justify-between mb-10">
          {steps.map((label, index) => {
            return (
              <div key={label} className="flex items-center">
                <div
                  className={`
                ${activeStep === index ? `bg-primary` : `bg-gray-300`} 
                ${index < activeStep ? `bg-success leading-1` : `bg-gray `}
                rounded-full w-8 h-8 text-center  text-white mr-3
                flex justify-center items-center `}
                >
                  {index < activeStep ? <Check /> : index + 1}
                </div>
                <p
                  className={`${
                    activeStep === index
                      ? `text-primary font-semibold text-sm`
                      : `text-gray-400 text-sm`
                  }
                ${index < activeStep ? `font-medium text-gray1` : ``}
                `}
                >
                  {label}
                </p>
                {index !== steps.length - 1 && (
                  <hr className="flex-grow border-gray-400 w-8 ml-7" />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex-1">{stepContent()}</div>
        <div className="flex gap-3 self-end items-end absolute bottom-16">
          {isNotFirstStep() && (
            <button
              onClick={handleBack}
              className={`h-[40px] px-6 md:h-[50px] rounded-[5px] border-2 border-gray2 text-gray`}
            >
              Précédent
            </button>
          )}
          <button
            onClick={handleNext}
            className={`text-sm md:text-base h-[40px] px-8 md:h-[50px] ${
              isProjectLoading ? "bg-opacity-75" : "bg-opacity-100"
            } bg-primary rounded-[5px] text-white font-semibold`}
          >
            {isProjectLoading ? <LoadingSpinner /> : "Continuer"}
          </button>
        </div>
      </div>
    );
  }
};

export default ProjectForm;
