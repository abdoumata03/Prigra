import React from "react";
import Breadcrumbs from "./breadcrumbs";
import ProfileContext from "../context/profile-context";
import { useContext, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { ReactComponent as Congratulation } from "/src/assets/illustrations/congras.svg";
import ProjectInfoField from "./project-info-field";

const Deliberation = () => {

  const {projectData, userInitialData} = useContext(ProfileContext);
  const [deliberationData, setDeliberationData] = useState(null);

  projectData.members.map((member)=> {
    if (member.email === userInitialData.email){
      if (member.deliberation !== deliberationData){
       setDeliberationData(member.deliberation);
       console.log(member.deliberation);
      }
    }})

  return (
    <>
      <Breadcrumbs />
      { !deliberationData  ? (
      <div className="bg-accent border px-8 py-6 rounded-[0.4rem] w-1/2">
      <div className="flex w-full gap-3">
        <div className="text-primary mt-1">
          <FiInfo />
        </div>
        <div>
          <p className="text-gray2 text-sm">
            Une délibération vous sera affichée sous peu
          </p>
        </div>
      </div>
    </div>
    ) : (
    <div>
          <h1 className="text-xl text-primary font-bold mb-2 ml-4">Félicitation !</h1>
          <h2 className="text-gray2 text-sm mb-5 ml-4">Voici votre résultat de déliberation :</h2>
          <div className="flex gap-10 items-center">
        <div className="w-1/3 flex flex-col bg-white rounded-[0.4rem] border py-4 px-6 shadow-custom">
          <div className="flex flex-col divide-y divide-dashed">
            <div className="flex">
              <div className="py-3 text-gray2 flex items-center">

              </div>
                <div className=" px-4 py-3 bg-white w-auto">
                <h1 className="text-xs text-gray3 mb-2 ">Note</h1>
                <p
                className={`font-medium text-sm`}
                >
                {deliberationData?.note}
                </p>
                </div>
              </div>
            <div className="flex">
              <div className="py-3 text-gray2 flex items-center">
                
              </div>
              <ProjectInfoField
                title={"Mention"}
                content={deliberationData?.mention}
              />
            </div>
            <div className="flex">
              <div className="py-3 text-gray2 flex items-center">
                
              </div>
              <ProjectInfoField
                title={"Appreciation"}
                content={deliberationData?.appreciation}
              />
              </div>  
          </div>
        </div>
        <div className="w-2/3 items-center justify-center ml-10">
          <Congratulation/>
        </div>
      </div>
    </div>
    ) }
    </>
  );
};

export default Deliberation;
