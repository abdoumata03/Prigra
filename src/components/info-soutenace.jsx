import React, { useContext, useEffect, useState } from "react";
import PersonField from "./person-filed";
import ProjectInfoField from "./project-info-field";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiMonitor,
  FiUsers,
} from "react-icons/fi";
import ProfileContext from "../context/profile-context";
import ProjectContext from "../context/project-context";
import Lottie from "lottie-react";
import Paperplane from "../assets/lottie/paperplane.json";

const InfoSoutenance = () => {
  const { projectData } = useContext(ProfileContext);
  const { getProjectSoutenance, ProjectSoutenance } = useContext(
    ProjectContext
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getProjectSoutenance(projectData?.soutenance.id);
      setIsLoading(false);
    })();
  }, []);
  return isLoading ? (
    <div className="flex bg-white justify-center items-center w-screen h-screen inset-0 absolute">
      <Lottie animationData={Paperplane} loop={true} />
    </div>
  ) : (
    <div className="h-full flex flex-col">
      <div className="w-fit flex gap-3 px-6 items-center text-success text-sm font-medium border border-success border-opacity-50 h-12 rounded-[0.4rem] mb-5">
        <FiCheckCircle />
        La soutenance de votre projet est programmée.
      </div>
      <div className="flex gap-8">
        <div className="w-1/2 flex flex-col bg-white rounded-[0.4rem] border py-4 px-6 shadow-custom">
          <h1 className="font-bold text-gray2 mb-2">Fiche de soutenance</h1>
          <div className="flex flex-col divide-y divide-dashed">
            <div className="flex">
              <div className="py-3 text-gray2 flex items-center">
                <FiCalendar />
              </div>
              <ProjectInfoField
                title={"Date de soutenance"}
                content={ProjectSoutenance?.date_soutenance}
              />
            </div>
            <div className="flex">
              <div className="py-3 text-gray2 flex items-center">
                <FiClock />
              </div>
              <ProjectInfoField
                title={"Heure"}
                content={ProjectSoutenance?.heure}
              />
            </div>
            <div className="flex">
              <div className="py-3 text-gray2 flex items-center">
                <FiMonitor />
              </div>
              <ProjectInfoField
                title={"Mode"}
                content={ProjectSoutenance?.mode}
              />
            </div>
            <div className="flex">
              <div className="py-3 text-gray2 flex items-center">
                <FiMapPin />
              </div>
              <ProjectInfoField
                title={"Lieu"}
                content={ProjectSoutenance?.lieu}
              />
            </div>
            <div className="flex">
              <div className="py-3 text-gray2 flex items-center">
                <FiUsers />
              </div>
              <ProjectInfoField
                title={"Nature"}
                content={ProjectSoutenance?.nature}
              />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col bg-white rounded-[0.4rem] border py-4 px-6 shadow-custom h-fit">
          <h1 className="font-bold text-gray2 mb-2">Jury</h1>
          <div className="flex items-center gap-3 mb-2 ">
            <p className="text-[13px] font-medium text-gray3 ">Président</p>
            <div className="h-[1px] flex-grow bg-gray-200" />
          </div>
          <PersonField
            name={"Sidi Mohammed BENSLIMANE"}
            email={ProjectSoutenance?.president_jury?.email}
          />
          <div className="flex items-center gap-3 mb-2 ">
            <p className="text-[13px] font-medium text-gray3 ">Membres</p>
            <div className="h-[1px] flex-grow bg-gray-200" />
          </div>

          {ProjectSoutenance?.invité && (
            <PersonField
              name={"Mimoun MALKI"}
              email={ProjectSoutenance?.invité?.email}
              invité={true}
            />
          )}
          {ProjectSoutenance?.team_jury.map((jury, index) => {
            return <PersonField name={"Mohammed KECHAR"} email={jury.email} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default InfoSoutenance;
