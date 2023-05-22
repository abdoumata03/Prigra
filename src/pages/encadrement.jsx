import React, { useState } from "react";
import { FiCalendar, FiFileText, FiGrid, FiTrello } from "react-icons/fi";
import MyProjectInfo from "./my-project-info";
import Breadcrumbs from "../components/breadcrumbs";
import EncProjectInfo from "./encadrement-project-info";
import EncDashboard from "./encadrement-dashboard";
import Tasks from "../components/taches";

const Encadrement = () => {
  const tabs = [
    { titre: "Tableau de bord", icon: <FiGrid /> },
    { titre: "Détails du projet", icon: <FiFileText /> },
    { titre: "Tâches", icon: <FiTrello /> },
    { titre: "Calendrier", icon: <FiCalendar /> },
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  function renderTab() {
    switch (selectedTabIndex) {
      case 0:
        return <EncDashboard />;
      case 1:
        return <EncProjectInfo />;
      case 2:
        return <Tasks />;
      case 3:
        return <div>Calendrier</div>;
    }
  }
  return (
    <div className="w-full flex flex-col flex-grow">
      <Breadcrumbs />
      <div className="flex gap-6 mb-10">
        {tabs.map((item, index) => (
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
        ))}
      </div>
      {renderTab()}
    </div>
  );
};

export default Encadrement;
