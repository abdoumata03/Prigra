import React from "react";
import { FiInfo } from "react-icons/fi";

const PreSoutenance = () => {
  return (
    <div className="bg-accent border px-8 py-6 rounded-[0.4rem] w-1/2">
      <div className="flex w-full gap-3">
        <div className="text-error mt-1">
          <FiInfo />
        </div>
        <div>
          <p className="text-gray2 text-sm">
            Votre projet n'est pas encore prêt pour la soutenance. Lorsque votre
            encadrant le marquera comme étant prêt, une soutenance sera
            programmée pour votre projet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreSoutenance;
