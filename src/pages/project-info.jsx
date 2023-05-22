import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Edit } from "../assets";
import {
  ProjectInfoField,
  PersonField,
  PopUpReponse,
} from "../components/index.js";
import ProjectContext from "../context/project-context";
import { FiCalendar, FiEdit, FiInfo, FiLink2, FiTrash2 } from "react-icons/fi";
import { ImageConfig } from "../utils/image-config";
import Breadcrumbs from "../components/breadcrumbs";

const ProjectInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const { deleteProject } = useContext(ProjectContext);
  const [projectDeleted, setProjectDeleted] = useState(false);

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
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openDeletePopup = () => {
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };

  const handleBack = () => {
    navigate("/commite-projects");
  };

  const handleReponce = () => {
    openPopup();
  };

  const handleDelete = () => {
    openDeletePopup();
  };

  const handleConfirmDelete = () => {
    deleteProject(projectData.id);
    setProjectDeleted(true);
    navigate("/commite-projects", { state: setProjectDeleted });
  };

  return (
    <div className="w-full flex flex-col">
      <Breadcrumbs />
      <div className=" flex lg:flex-row flex-col lg:gap-10 gap-0">
        <div className=" lg:w-3/5 w-full flex flex-col">
          <div className="w-full flex flex-col divide-y divide-dashed bg-white rounded-[0.4rem] border py-2 px-4 shadow-custom">
            <ProjectInfoField
              title="Type de projet"
              content={projectData.type}
            />
            <ProjectInfoField
              title="Nom scientifique"
              content={projectData.nom_scientifique}
            />
            <ProjectInfoField
              title="Nom commercial"
              content={projectData.nom_commercial}
            />
            <ProjectInfoField
              title="Description de projet"
              content={projectData.description}
            />
            <div className=" px-4 py-3 bg-white w-auto">
              <div className="flex gap-2  mb-2 text-gray3">
                <FiLink2 />
                <h1 className="text-xs">Fichiers attachés</h1>
              </div>
              <p className={`font-medium text-sm`}>
                {projectData?.project_files ? (
                  projectData?.project_files?.reverse().map((item, index) => (
                    <div
                      key={index}
                      className="bg-accent rounded-[0.4rem] px-6 py-3 mb-2 w-full flex flex-row justify-between items-center"
                    >
                      <div className="w-8 mr-3">{ImageConfig[item.format]}</div>
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <a href={item.url} target="_blank" className="font-medium text-sm text-gray1 mb-1 truncate">
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
        </div>
        <div className=" lg:w-2/5 w-full flex flex-col mb-10">
          <div className=" w-full flex flex-row px-5 py-3 shadow-custom bg-white mb-3 rounded-[0.4rem] border items-center">
            <FiCalendar />
            <div className="ml-4">
              <h1 className="text-gray3 text-xs mb-1">Date de création</h1>
              <p className="text-gray1 font-medium">25/04/2023</p>
            </div>
          </div>
          <div className="h-auto ">
            <div className="bg-white rounded-[0.4rem] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3 ">
              <div className="flex items-center gap-3 mb-2 ">
                <p className="text-[13px] font-medium text-gray3 ">
                  Porteur de projet
                </p>
                <div className="h-[1px] flex-grow bg-gray-200" />
              </div>
              <PersonField
                name={projectData?.owner}
                email="c.belbachir@esi-sba.dz"
              />
              <div className="flex items-center gap-3 mb-2 ">
                <p className="text-[13px] font-medium text-gray3 ">
                  Membres de l'équipe
                </p>
                <div className="h-[1px] flex-grow bg-gray-200" />
              </div>
              {projectData.members?.map((member, index) => (
                <PersonField name=" Belbachir Chaimaa" email={member.email} />
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
                  projectData.encadrant?.map((Enc, index) => (
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
                {projectData.co_encadrant?.length > 0 ? (
                  projectData.co_encadrant?.map((coEnc, index) => (
                    <PersonField name={coEnc.full_name} email={coEnc.email} />
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
      </div>
      {/* actions */}
      <div className="flex flex-row justify-end gap-6">
        <div
          className="flex flex-row items-center px-5 py-3  text-error  rounded-[5px] border border-error cursor-pointer"
          onClick={handleDelete}
        >
          <FiTrash2 />
          <h1 className="ml-2">Retirer</h1>
        </div>
        <div
          className="flex flex-row items-center gap-3 px-5 py-3 bg-info text-white rounded-[0.4rem] cursor-pointer"
          onClick={handleReponce}
        >
          <FiEdit />
          <h1 className="ml-2">Réponse</h1>
        </div>
      </div>
      <div className="lg:overflow-auto lg:h-100 h-auto "></div>
      <div className="lg:overflow-auto lg:h-100 h-auto "></div>
      {isPopupOpen && <PopUpReponse onclick={closePopup} />}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" w-2/6 h-1/5 rounded bg-white_bg py-10 justify-center">
            <h1 className=" text-[18px] text-gray2 mb-10 text-center">
              Vous êtes sûr de supprimer ce projet ?
            </h1>
            <div className="flex flex-row justify-center gap-5 bottom-10">
              <div
                onClick={closeDeletePopup}
                className="flex w-max flex-row px-5 py-3 rounded-[0.4rem] cursor-pointer border border-gray4"
              >
                <h1 className=" text-gray3">Annuler</h1>
              </div>
              <div
                className="flex flex-row px-5 py-3 text-white rounded-[0.4rem] border border-error cursor-pointer"
                onClick={handleConfirmDelete}
              >
                <img src={Delete} alt="delete" />
                <h1 className="ml-2 text-error">Retirer</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectInfo;
