import React, { useContext } from "react";
import ProfileContext from "../context/profile-context";
import { FiCalendar } from "react-icons/fi";
import { ProjectInfoField, PersonField } from "../components/index.js";

const MyProjectInfo = () => {
  const { projectData, userData } = useContext(ProfileContext);

  return (
    <div className="flex lg:flex-row flex-col lg:gap-10 gap-0 w-full max-h-screen">
      <div className="w-full flex flex-col">
        <ProjectInfoField title="Titre de projet" content={projectData?.name} />
        <ProjectInfoField
          title="Description de projet"
          content={projectData?.description}
        />
        <ProjectInfoField title="Fichier attaché" />
        <div className="w-full flex flex-row gap-3">
          <ProjectInfoField
            title="Type de projet"
            content={projectData?.type}
          />
          <ProjectInfoField
            title="Status de projet"
            content={projectData?.status_reponse}
          />
        </div>
      </div>
      <div className="w-full flex flex-col mb-10">
        <div className="xl:w-full w-full flex flex-row items-center px-5 py-3 bg-white mb-3 rounded-[5px] border">
          <FiCalendar />
          <div className="ml-4">
            <h1 className="text-[14px] text-gray3 mb-2 ">Date de soumission</h1>
            <p className="font-medium">25/04/2023</p>
          </div>
        </div>
        <div className="lg:overflow-auto">
          <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3 ">
            <p className="text-[13px] font-medium text-gray3 mb-2 ">
              Porteur de projet
            </p>
            <PersonField name={projectData?.owner} email={userData?.email} />
          </div>
          <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
            <p className="text-[13px] font-medium text-gray3 mb-2 ">
              Encadrants
            </p>
            <div>
              {console.log(projectData)}
              {projectData?.encadrant?.map((Enc, index) => (
                <PersonField name="Belbachir Chaimaa" email={Enc} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
            <p className="text-[13px] font-medium text-gray3 mb-2 ">
              Co-Encadrants
            </p>
            <div>
              {projectData?.co_encadrant?.map((coEnc, index) => (
                <PersonField name="Belbachir Chaimaa" email={coEnc} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border">
            <p className="text-[13px] font-medium text-gray3 mb-2 ">
              Membres de l'equipe
            </p>
            {projectData?.members?.map((member, index) => (
              <PersonField name=" Belbachir Chaimaa" email={member.email} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectInfo;
