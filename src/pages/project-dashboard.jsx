import React, { useState } from "react";
import TableauDeBord from "../components/tableau-de-bord";
import Tasks from "../components/taches";
import Calendar from "../components/calendar";
import { FiCalendar, FiGrid, FiTrello } from "react-icons/fi";

const ProjectDashboard = () => {
  // const tabs = ["Tableau de bord", "Tâches", "Calendrier"];

  const tabs = [
    { titre: "Tableau de bord", icon: <FiGrid /> },
    { titre: "Tâches", icon: <FiTrello /> },
    { titre: "Calendrier", icon: <FiCalendar /> },
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  function renderTab() {
    switch (selectedTabIndex) {
      case 0:
        return <TableauDeBord />;
      case 1:
        return <Tasks />;
      case 2:
        return <Calendar />;
    }
  }

  return (
    <div className="w-full flex flex-col flex-grow">
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

export default ProjectDashboard;
