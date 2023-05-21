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
import { useNavigate } from "react-router";

const ProjectForm = () => {
  const steps = [
    "Type de projet",
    "Information de projet",
    "Membres de l'équipe",
    "Confirmation",
  ];

  // const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const {
    putProjectType,
    isPuttingInfo,
    activeStep,
    setActiveStep,
  } = useContext(ProjectContext);
  const {
    isLoading,
    projectData,
    fetch_project,
    isProjectLoading,
    type,
  } = useContext(ProfileContext);

  const infoFormRef = useRef();
  const encFormRef = useRef();

  const navigator = useNavigate();

  const handleNext = async () => {
    if (activeStep === 0 && type !== projectData?.type) {
      putProjectType();
      await fetch_project();
    }

    if (activeStep === 0 || activeStep === 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    if (activeStep === 1) {
      infoFormRef.current?.click();
    }

    if (activeStep === 2) {
      encFormRef.current?.click();
    }

    if (activeStep === 3) {
      navigator("/project");
    }

    if (activeStep === steps.length - 1) {
      setIsComplete(true);
    }
  };

  useEffect(() => {
    activeStep === steps.length - 1
      ? setIsComplete(true)
      : setIsComplete(false);
  }, [activeStep]);

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
        return <ProjectThirdStep innerRef={encFormRef} />;
      case 3:
        return <ProjectLastStep />;
    }
  };

  return (
    <div className="w-[90%] h-full pb-14 flex flex-col">
      <div className="flex gap-7 mb-10">
        {steps.map((label, index) => {
          return (
            <div key={label} className="flex items-center">
              <div
                className={`
                ${activeStep === index ? `bg-primary` : `bg-gray-300`} 
                ${index < activeStep ? `bg-success leading-1` : `bg-gray `}
                rounded-full w-6 h-6 text-center  text-white mr-3
                flex justify-center items-center text-xs font-medium `}
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
      <div className="flex gap-3 self-end items-end mt-6">
        {isNotFirstStep() && (
          <button
            onClick={handleBack}
            className={`h-[40px] px-6 md:h-[50px] rounded-[0.4rem] border-2 border-gray4 text-gray2`}
          >
            Précédent
          </button>
        )}
        <button
          onClick={handleNext}
          className={`text-sm md:text-base w-42 h-[40px] px-8 md:h-[50px] ${
            isProjectLoading || isPuttingInfo
              ? "bg-opacity-75"
              : "bg-opacity-100"
          } bg-primary rounded-[0.4rem] text-white font-semibold`}
        >
          {isProjectLoading || isPuttingInfo ? (
            <LoadingSpinner />
          ) : isComplete ? (
            "Confirmer"
          ) : (
            "Continuer"
          )}
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
