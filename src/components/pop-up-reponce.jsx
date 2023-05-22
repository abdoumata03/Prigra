import React, { useContext, useState } from "react";
import { Vector } from "../assets";
import { CheckProject, FileInput } from "../components/index.js";
import ProjectContext from "../context/project-context";
import { FiX } from "react-icons/fi";

const PopUpReponse = (props) => {
  const [state, setState] = useState({
    approve: false,
    refuse: false,
    approveReserve: false,
    pme: false,
  });
  const { ProjectReponse } = useContext(ProjectContext);

  const handleSubmit = () => {
    let reponse = "";
    if (state.approve) {
      reponse = "approver";
    } else if (state.refuse) {
      reponse = "refuser";
    } else if (state.approveReserve) {
      reponse = "approveReserve";
    } else if (state.pme) {
      reponse = "pme";
    }

    ProjectReponse(reponse, "rapport d'expertise");
  };

  const handleValidation = () => {
    setState((prevState) => ({
      ...prevState,
      approve: !prevState.approve,
      refuse: false,
      approveReserve: false,
      pme: false,
    }));
  };

  const handleRefus = () => {
    setState((prevState) => ({
      ...prevState,
      refuse: !prevState.refuse,
      approve: false,
      approveReserve: false,
      pme: false,
    }));
  };

  const handleValidationReserve = () => {
    setState((prevState) => ({
      ...prevState,
      approveReserve: !prevState.approveReserve,
      approve: false,
      refuse: false,
      pme: false,
    }));
  };

  const handlePme = () => {
    setState((prevState) => ({
      ...prevState,
      pme: !prevState.pme,
      approve: false,
      refuse: false,
      approveReserve: false,
    }));
  };

  return (
    <div className="fixed inset-0 px-10 flex items-center justify-center bg-black bg-opacity-25">
      <div className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center">
        <div className="flex flex-col items-start py-4 px-10 w-full">
          <div className="flex items-center gap-20 mb-4 w-full">
            <h1 className="text-gray1 text-lg font-bold flex-1 ">
              Indiquez votre décision
            </h1>
            <div onClick={props.onClick} className="text-gray3 cursor-pointer">
              <FiX />
            </div>
          </div>
          <CheckProject
            name="Projet éligible pour sturtup ( Valider )"
            clicked={state.approve}
            onclick={handleValidation}
          />
          <CheckProject
            name="Projet éligible pour un PFE classique ( Refuser )"
            clicked={state.refuse}
            onclick={handleRefus}
          />
          <CheckProject
            name="Projet éligible avec rèserves"
            clicked={state.approveReserve}
            onclick={handleValidationReserve}
          />
          <CheckProject
            name="Projet éligible pour PME"
            clicked={state.pme}
            onclick={handlePme}
          />
        </div>
        <div className="w-full flex-col md:flex-row flex items-center justify-end gap-2 px-8 h-fit py-4 bg-gray-100 rounded-b-lg">
          <div
            onClick={props.onclick}
            className="flex w-max flex-row px-5 py-3 rounded-[0.4rem] cursor-pointer border border-gray4"
          >
            <h1 className="text-gray3">Annuler</h1>
          </div>
          <div
            onClick={handleSubmit}
            className="flex w-max flex-row px-5 py-3 bg-success text-white rounded-[0.4rem] cursor-pointer"
          >
            <img src={Vector} alt="valider" />
            <h1 className="ml-2">Envoyer réponse</h1>
          </div>
        </div>
      </div>
    </div>

    //

    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //   <div className="absolute w-2/5 h-3/5 rounded bg-white_bg px-10 py-10  overflow-auto  ">
    //     <div className="flex-col">
    //       <h1 className="text-[20px] font-medium mb-10 text-gray2">
    //         Indiquez votre décision :
    //       </h1>
    //       <CheckProject
    //         name="Projet éligible pour sturtup ( Valider )"
    //         clicked={state.approve}
    //         onclick={handleValidation}
    //       />
    //       <CheckProject
    //         name="Projet éligible pour un PFE classique ( Refuser )"
    //         clicked={state.refuse}
    //         onclick={handleRefus}
    //       />
    //       <CheckProject
    //         name="Projet éligible avec rèserves"
    //         clicked={state.approveReserve}
    //         onclick={handleValidationReserve}
    //       />
    //       <CheckProject
    //         name="Projet éligible pour PME"
    //         clicked={state.pme}
    //         onclick={handlePme}
    //       />
    //       <div className="mt-10">
    //         <FileInput />
    //       </div>

    //       <div className="absolute right-10 flex flex-row justify-end items-end gap-5 bottom-10">
    //         <div
    //           onClick={props.onclick}
    //           className="flex w-max flex-row px-5 py-3 rounded-[0.4rem] cursor-pointer border border-gray4"
    //         >
    //           <h1 className="text-gray3">Annuler</h1>
    //         </div>
    //         <div
    //           onClick={handleSubmit}
    //           className="flex w-max flex-row px-5 py-3 bg-success text-white rounded-[0.4rem] cursor-pointer"
    //         >
    //           <img src={Vector} alt="valider" />
    //           <h1 className="ml-2">Envoyer réponse</h1>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default PopUpReponse;
