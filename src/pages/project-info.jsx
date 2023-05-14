import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Calendar, Clock, Delete, Edit, Person, Vector } from "../assets";
import { ProjectInfoField, PersonField } from "../components/index.js";

const ProjectInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state;
  

  const handleClick = () => {
    navigate("/comite-projects");
  };
  const handleReponce = () => {};
  const handleDelete = () => {};
  const handleValide = () => {};

  return (
    <div className="w-[90%] flex flex-col mb-20">
      <div className=" flex lg:flex-row flex-col mt-10 lg:gap-10 gap-0">
        <div className=" lg:w-3/5 w-full flex flex-col">
          <ProjectInfoField
            title="Titre de projet"
            content={projectData?.name}
          />
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
        <div className=" lg:w-2/5 w-full flex flex-col mb-10">
          <div className="xl:w-full w-full flex flex-row px-5 py-3 bg-white mb-3 rounded-[5px] border">
            <img src={Calendar} alt="calendar" />
            <div className="ml-4">
              <h1 className="text-[14px] text-gray3 mb-2 ">
                Date de soumission{" "}
              </h1>
              <p className="font-medium">25/04/2023</p>
            </div>
          </div>
          <div className="lg:overflow-auto lg:h-100 h-auto ">
            <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3 ">
              <p className="text-[13px] font-medium text-gray3 mb-2 ">
                Porteur de projet
              </p>
              <PersonField
                name={projectData?.owner}
                email="c.belbachir@esi-sba.dz"
              />
            </div>
            <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
              <p className="text-[13px] font-medium text-gray3 mb-2 ">
                Encadrants
              </p>
              <div>
                {projectData?.encadrant?.map((Enc, index) => (
                  <PersonField name=" Belbachir Chaimaa" email={Enc} />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
              <p className="text-[13px] font-medium text-gray3 mb-2 ">
                Co-Encadrants
              </p>
              <div>
                {projectData?.co_encadrant?.map((coEnc, index) => (
                  <PersonField name=" Belbachir Chaimaa" email={coEnc} />
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
      {/* actions */}
      <div className="flex flex-row justify-between">
        <div
          className="flex flex-row px-5 py-3 bg-info text-white rounded-[5px] cursor-pointer"
          onClick={handleReponce}
        >
          <img src={Edit} alt="edit" />
          <h1 className="ml-2">Reponce</h1>
        </div>
        <div
          className="flex flex-row px-5 py-3 text-white rounded-[5px] border border-error cursor-pointer"
          onClick={handleDelete}
        >
          <img src={Delete} alt="delete" />
          <h1 className="ml-2 text-error">Retirer</h1>
        </div>
      </div>
    </div>
  );
};
export default ProjectInfo;
