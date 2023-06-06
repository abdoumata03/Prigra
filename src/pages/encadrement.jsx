import React, { useContext, useEffect, useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiFileText,
  FiGrid,
  FiInfo,
  FiMonitor,
  FiTrello,
} from "react-icons/fi";
import Breadcrumbs from "../components/breadcrumbs";
import EncProjectInfo from "./encadrement-project-info";
import EncDashboard from "./encadrement-dashboard";
import Tasks from "../components/taches";
import Calendar from "../components/calendar";
import ProjectContext from "../context/project-context";
import ProfileContext from "../context/profile-context";
import InfoSoutenance from "../components/info-soutenace";

const Encadrement = () => {
  const tabs = [
    { titre: "Tableau de bord", icon: <FiGrid /> },
    { titre: "Détails du projet", icon: <FiFileText /> },
    { titre: "Soutenance", icon: <FiMonitor /> },
    { titre: "Tâches", icon: <FiTrello /> },
    { titre: "Calendrier", icon: <FiCalendar /> },
  ];

  const { getProjectTasks } = useContext(ProjectContext);
  const { projectData } = useContext(ProfileContext);

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  function renderTab() {
    switch (selectedTabIndex) {
      case 0:
        return <EncDashboard />;
      case 1:
        return <EncProjectInfo />;
      case 2:
        return <InfoSoutenance />;
      case 3:
        return <Tasks />;
      case 4:
        return <Calendar />;
    }
  }

  const hasSoutenance = projectData?.soutenance;

  useEffect(() => {
    getProjectTasks(projectData?.id);
  }, []);

  return (
    <div className="w-full flex flex-col flex-grow">
      <Breadcrumbs />
      <div className="flex gap-6 mb-10">
        {tabs.map((item, index) => {
          if (index === 2 && hasSoutenance) {
            return (
              <button onClick={() => setSelectedTabIndex(index)}>
                <div
                  className={`${
                    selectedTabIndex === index
                      ? `bg-primary text-white font-bold`
                      : ` bg-white text-gray3 font-medium`
                  } py-2 flex items-center gap-2 px-6 rounded-[0.5rem] text-sm shadow-custom`}
                >
                  {item.icon}
                  {item.titre}
                </div>
              </button>
            );
          } else if (index !== 2) {
            return (
              <button onClick={() => setSelectedTabIndex(index)}>
                <div
                  className={`${
                    selectedTabIndex === index
                      ? `bg-primary text-white font-bold`
                      : ` bg-white text-gray3 font-medium`
                  } py-2 flex items-center gap-2 px-6 rounded-[0.5rem] text-sm shadow-custom`}
                >
                  {item.icon}
                  {item.titre}
                </div>
              </button>
            );
          }
        })}
      </div>
      {projectData?.is_authorized && projectData?.soutenance ? (
        <div
          className={`w-fit ${selectedTabIndex === 2? "hidden":"flex"} flex gap-3 px-6 items-center text-success text-sm font-medium border border-success border-opacity-50 h-12 rounded-[0.4rem] mb-5`}
        >
          <FiCheckCircle />
          La soutenance de ce projet est programmée.
        </div>
      ) : (
        <div className="bg-accent border px-8 py-4 rounded-[0.4rem] w-1/2 mb-4">
          <div className="flex w-full gap-3">
            <div className="text-primary mt-1">
              <FiInfo />
            </div>
            <div>
              <p className="text-gray1 text-sm font-medium">
                Une soutenance sera programmé sous peu pour ce projet
              </p>
            </div>
          </div>
        </div>
      )}
      {renderTab()}
    </div>
  );
};

export default Encadrement;
