import React, { useContext, useState } from "react";
import ProfileContext from "../context/profile-context";
import {
  FiCalendar,
  FiClock,
  FiEdit3,
  FiInfo,
  FiLink2,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { ProjectInfoField, PersonField } from "../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import ProjectContext from "../context/project-context";
import PhaseContext from "../context/phase-context";
import { toast } from "react-hot-toast";
import { ImageConfig } from "../utils/image-config";

const MyProjectInfo = ({}) => {
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

  const bytesToMB = (bytes) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes < 1073741824) {
      return (bytes / 1048576).toFixed(2) + " MB";
    } else {
      return (bytes / 1073741824).toFixed(2) + " GB";
    }
  };

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
    await toast.promise(deleteProject(projectId), {
      loading: "En train de retirer votre projet...",
      success: "Votre projet a été retiré",
      error: "Erreur lors la supression de votre projet",
    });
    navigate(0);
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col gap-10 w-full">
        <div className="flex flex-col w-1/2 gap-0 lg:gap-6">
          <div className="flex bg-white border shadow-custom w-full py-[0.3rem] px-[0.3rem] rounded-[0.4rem] ">
            <button
              onClick={onClickInfo}
              className={`flex-1 py-2 rounded-[0.4rem] ${
                value === 0
                  ? `bg-primary  text-white font-medium`
                  : `bg-white text-gray2`
              }`}
            >
              Informations
            </button>
            <button
              onClick={onClickMembers}
              className={`flex-1 py-2 rounded-[0.4rem] ${
                value === 1
                  ? `bg-primary text-white font-medium`
                  : `bg-white text-gray2`
              }`}
            >
              Équipe
            </button>
          </div>

          {value === 0 ? (
            <div className="w-full flex flex-col divide-y divide-dashed bg-white rounded-[0.4rem] border py-2 px-4 shadow-custom">
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
              <div className=" px-4 py-3 bg-white w-auto">
                <div className="flex gap-2  mb-2 text-gray3">
                  <FiLink2 />
                  <h1 className="text-xs">Fichiers attachés</h1>
                </div>
                <p className={`font-medium text-sm`}>
                  {projectData?.project_files?.length > 0 ? (
                    projectData?.project_files?.reverse().map((item, index) => (
                      <div
                        key={index}
                        className="bg-accent rounded-[0.4rem] px-6 py-3 mb-2 w-full flex flex-row justify-between items-center"
                      >
                        <div className="w-8 mr-3">
                          {ImageConfig[item.format]}
                        </div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <a
                            href={item.url}
                            target="_blank"
                            className="font-medium text-sm text-gray1 mb-1 truncate"
                          >
                            {item.name}
                          </a>
                          <p className="font-regualar text-xs text-gray3">
                            {bytesToMB(item.size)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full">
                      <p className="text-gray3 font-medium">
                        Aucun fichier attaché
                      </p>
                    </div>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col mb-10">
              <div className="lg:overflow-auto">
                <div className="bg-white rounded-[0.4rem] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3 ">
                  <div className="flex items-center gap-3 mb-2 ">
                    <p className="text-[13px] font-medium text-gray3 ">
                      Porteur de projet
                    </p>
                    <div className="h-[1px] flex-grow bg-gray-200" />
                  </div>
                  <PersonField
                    name={projectData?.owner.full_name}
                    email={projectData?.owner.email}
                  />
                  <div className="flex items-center gap-3 mb-2 ">
                    <p className="text-[13px] font-medium text-gray3 ">
                      Membres de l'équipe
                    </p>
                    <div className="h-[1px] flex-grow bg-gray-200" />
                  </div>
                  {projectData?.members?.map((member, index) => (
                    <PersonField
                      name=" Belbachir Chaimaa"
                      email={member.email}
                    />
                  ))}
                </div>
                <div className="bg-white rounded-[0.4rem] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
                  <div className="flex items-center gap-3 mb-2 ">
                    <p className="text-[13px] font-medium text-gray3 ">
                      Encadrants
                    </p>
                    <div className="h-[1px] flex-grow bg-gray-200" />
                  </div>
                  <div>
                    {projectData?.encadrant.length > 0 ? (
                      projectData?.encadrant?.map((Enc, index) => (
                        <>
                          <PersonField
                            name={Enc.full_name}
                            email={Enc.email}
                            key={index}
                          />
                        </>
                      ))
                    ) : (
                      <div className="flex items-center gap-2 text-gray4 pb-3">
                        <FiInfo />
                        <p className="text-sm ">
                          Aucun encadrant a n'a été spécifié
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-2 ">
                    <p className="text-[13px] font-medium text-gray3 ">
                      Co-encadrants
                    </p>
                    <div className="h-[1px] flex-grow bg-gray-200" />
                  </div>
                  <div>
                    {projectData?.co_encadrant?.length > 0 ? (
                      projectData?.co_encadrant?.map((coEnc, index) => (
                        <PersonField
                          name={coEnc.full_name}
                          email={coEnc.email}
                        />
                      ))
                    ) : (
                      <div className="flex items-center gap-2 text-gray4 pb-3">
                        <FiInfo />
                        <p className="text-sm ">
                          Aucun co-encadrant a n'a été spécifié
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white w-1/2 shadow-custom rounded-[0.4rem] flex flex-col h-fit items-center py-6 border">
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
        <div className="fixed inset-0 px-10 flex items-center justify-center bg-black bg-opacity-25">
          <div className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center">
            <div className="flex flex-col items-start py-4 px-10 w-full">
              <div className="flex items-center gap-20 mb-4 w-full">
                <h1 className="text-gray1 text-lg font-bold flex-1 ">
                  Êtes-vous sûr de vouloir supprimer votre projet ?
                </h1>
                <div
                  onClick={onHideDelete}
                  className="text-gray3 cursor-pointer"
                >
                  <FiX />
                </div>
              </div>
              <p className="text-sm font-medium text-gray3 mb-6">
                Toutes les informations de votre projet seront perdues
              </p>
            </div>
            <div className="w-full flex-col md:flex-row flex items-center justify-end gap-2 px-8 h-fit py-4 bg-gray-100 rounded-b-lg">
              <div
                onClick={onHideDelete}
                className="flex flex-row justify-center px-5 py-3 rounded-[0.4rem] cursor-pointer border bg-white "
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
