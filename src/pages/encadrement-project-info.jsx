import React, { useContext } from "react";
import ProfileContext from "../context/profile-context";
import { FiInfo, FiLink2 } from "react-icons/fi";
import { PersonField, ProjectInfoField } from "../components";
import { ImageConfig } from "../utils/image-config";

const EncProjectInfo = () => {
  const { projectData } = useContext(ProfileContext);

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

  return (
    <div className="flex gap-10">
      <div className="flex grow h-fit flex-col divide-y divide-dashed bg-white rounded-[0.4rem] border py-2 px-4 shadow-custom">
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
            projectData?.description ? projectData?.description : "Non spécifié"
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
                  <div className="w-8 mr-3">{ImageConfig[item.format]}</div>
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
                <p className="text-gray3 font-medium">Aucun fichier attaché</p>
              </div>
            )}
          </p>
        </div>
      </div>
      <div className="flex grow flex-col mb-10">
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
            <p className="text-[13px] font-medium text-gray3 ">Encadrants</p>
            <div className="h-[1px] flex-grow bg-gray-200" />
          </div>
          <div>
            {projectData?.encadrant?.length > 0 ? (
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
                <p className="text-sm ">Aucun encadrant a n'a été spécifié</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 mb-2 ">
            <p className="text-[13px] font-medium text-gray3 ">Co-encadrants</p>
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
  );
};

export default EncProjectInfo;
