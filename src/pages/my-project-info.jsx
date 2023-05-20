import React, { useContext, useState } from "react";
import ProfileContext from "../context/profile-context";
import { styled } from "@mui/material/styles";

import {
  FiCalendar,
  FiClock,
  FiDelete,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";
import { ProjectInfoField, PersonField } from "../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import ProjectContext from "../context/project-context";
import PhaseContext from "../context/phase-context";

const MyProjectInfo = () => {
  const { projectData, userData, projectId } = useContext(ProfileContext);
  const { phases } = useContext(PhaseContext);
  const { deleteProject } = useContext(ProjectContext);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [value, setValue] = useState(0);

  function getDateFinSoumission() {
    for (let i = 0; i < phases?.length; i++) {
      if (phases[i].nom_phase === "Période de soumission des projets") {
        return phases[i].date_fin;
      }
    }

    return null; // Return null if the phase is not found
  }

  const navigate = useNavigate();

  const onClickInfo = () => {
    setValue(0);
  };

  const onClickMembers = () => {
    setValue(1);
  };

  const onClickDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const onHideDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    await deleteProject(projectId);
    navigate(0);
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-10 w-full">
        <div className="flex flex-col w-1/2 gap-0 lg:gap-6">
          <div className="flex bg-white shadow-custom w-full py-[0.3rem] px-[0.3rem] rounded-[0.4rem] ">
            <button
              onClick={onClickInfo}
              className={`flex-1 py-2 rounded-[0.4rem] ${
                value === 0
                  ? `bg-primary  text-white font-medium`
                  : `bg-white text-gray1`
              }`}
            >
              Informations
            </button>
            <button
              onClick={onClickMembers}
              className={`flex-1 py-2 rounded-[0.4rem] ${
                value === 1
                  ? `bg-primary text-white font-medium`
                  : `bg-white text-gray1`
              }`}
            >
              Equipe
            </button>
          </div>

          {value === 0 ? (
            <div className="w-full flex flex-col">
              <ProjectInfoField
                title="Type de projet"
                content={projectData?.type ? projectData?.type : "Non spécifié"}
              />
              <ProjectInfoField
                title="Nom scientifique"
                content={
                  projectData?.nom_scientifique
                    ? projectData?.nom_scientifique
                    : "Non spécifié"
                }
              />
              <ProjectInfoField
                title="Nom commercial"
                content={
                  projectData?.nom_commercial
                    ? projectData?.nom_commercial
                    : "Non spécifié"
                }
              />
              <ProjectInfoField
                title="Description de projet"
                content={
                  projectData?.description
                    ? projectData?.description
                    : "Non spécifié"
                }
              />
              <ProjectInfoField title="Fichiers attachés" />
            </div>
          ) : (
            <div className="flex flex-col mb-10">
              <div className="lg:overflow-auto">
                <div className="bg-white rounded-[0.4rem] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3 ">
                  <p className="text-[13px] font-medium text-gray3 mb-2 ">
                    Porteur de projet
                  </p>
                  <PersonField
                    name={projectData?.owner}
                    email={userData?.email}
                  />
                </div>
                {projectData?.encadrant?.length !== 0 && (
                  <div className="bg-white rounded-[0.4rem] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
                    <p className="text-[13px] font-medium text-gray3 mb-2 ">
                      Encadrants
                    </p>
                    <div>
                      {projectData?.encadrant?.map((Enc) => (
                        <PersonField name={Enc.full_name} email={Enc.email} />
                      ))}
                    </div>
                  </div>
                )}
                {projectData?.co_encadrant?.length !== 0 && (
                  <div className="bg-white rounded-[0.4rem] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
                    <p className="text-[13px] font-medium text-gray3 mb-2 ">
                      Co-Encadrants
                    </p>
                    <div>
                      {projectData?.co_encadrant?.map((coEnc) => (
                        <PersonField
                          name={coEnc.full_name}
                          email={coEnc.email}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="bg-white rounded-[0.4rem] shadow-custom flex flex-col justify-center py-3 px-5 border">
                  <p className="text-[13px] font-medium text-gray3 mb-2 ">
                    Membres de l'equipe
                  </p>
                  {projectData?.members?.map((member, index) => (
                    <PersonField
                      name=" Belbachir Chaimaa"
                      email={member.email}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white w-1/2 shadow-custom rounded-[0.4rem] flex flex-col h-fit items-center py-6">
          <div className="flex w-5/6 gap-3 mb-3">
            <button
              onClick={onClickDelete}
              className="border border-error flex gap-2 items-center justify-center flex-1 text-error rounded-[0.4rem] font-medium"
            >
              <FiTrash2 />
              Retirer
            </button>
            <Link to={"/project/edit"} className="flex flex-1">
              <button className="bg-primary gap-2  w-full flex items-center justify-center text-white py-3 rounded-[0.4rem] font-medium">
                <FiEdit3 />
                Modifier
              </button>
            </Link>
          </div>
          <div className="w-5/6 flex flex-col divide-y-2 divide-gray-100">
            <div className="flex gap-6 items-center py-3">
              <div className="text-gray2">
                <FiCalendar />
              </div>
              <div>
                <p className="text-gray3 text-xs mb-1">Date de création</p>
                <h2 className="text-gray1 text-base font-medium">
                  {projectData?.created_at}
                </h2>
              </div>
            </div>
            <div className="flex gap-6 items-center py-3">
              <div className="text-gray2">
                <FiClock />
              </div>
              <div>
                <p className="text-gray3 text-xs mb-1">Délai de modification</p>
                <h2 className="text-gray1 text-base font-medium">
                  {getDateFinSoumission()}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 px-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-2/5 rounded flex flex-col items-center bg-white py-10 px-10 justify-center">
            <h1 className="text-lg text-gray1 mb-3 font-bold text-center">
              Êtes-vous sûr de vouloir supprimer votre projet ?
            </h1>
            <p className="text-base text-gray2">
              Toutes les informations de votre projet seront perdues
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-3 bottom-10 mt-9">
              <div
                onClick={onHideDelete}
                className="flex flex-row justify-center px-5 py-3 rounded-[0.4rem] cursor-pointer border border-gray3"
              >
                <h1 className=" text-gray2">Non, annuler</h1>
              </div>
              <button
                onClick={handleConfirmDelete}
                className="flex flex-row items-center gap-2 rounded-[0.4rem] px-5 py-3 text-white bg-error cursor-pointer"
              >
                <FiTrash2 />
                <h1>Oui, retirer quand meme</h1>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProjectInfo;
