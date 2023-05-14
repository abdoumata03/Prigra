import React from "react";
import { ReactComponent as Saved } from "../assets/illustrations/saved.svg";
import { ReactComponent as Success } from "../assets/icons/success.svg";

const ProjectLastStep = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="mb-12 w-[130px]">
        <Saved />
      </div>
      <div className="flex items-center mb-3 gap-2">
        <Success />

        <h1 className="font-bold text-center text-lg text-gray1 leading-6 ">
          Les information de votre projet sont bien enregistrés
        </h1>
      </div>
      <p className="text-gray2 text-base">
        Vous pouvez conulter et modifier votre projet pendant la période de
        soumission.
      </p>
    </div>
  );
};

export default ProjectLastStep;
