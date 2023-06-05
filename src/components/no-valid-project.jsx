import React from "react";
import { FiInfo } from "react-icons/fi";

const NoValidProject = () => {
  return (
    <div className="bg-accent border px-8 py-6 rounded-[0.4rem] w-1/2">
      <div className="flex w-full gap-3">
        <div className="text-error mt-1">
          <FiInfo />
        </div>
        <div>
          <p className="text-gray2 text-sm">
            Votre n'avez pas encore un projet validé ou prêt pour la soutenance
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoValidProject;
