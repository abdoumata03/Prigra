import React, { useContext } from "react";
import { FiCheckCircle, FiClock, FiPercent } from "react-icons/fi";
import StatCard from "./stat-card";
import Messenger from "./messenger";
import ProjectContext from "../context/project-context";

const TableauDeBord = () => {
  const { tasksData } = useContext(ProjectContext);

  // STATS
  const tasksCompleted = tasksData.filter((item) => item.status === "DONE")
    .length;
  const tasksPending = tasksData.filter(
    (item) => item.status === "ATTENTE" || item.status === "TO DO"
  ).length;

  const taux = 60;
  return (
    <div className="flex flex-row gap-8 flex-grow h-full">
      <div className="flex flex-col gap-3">
        <div className="bg-white w-full flex-grow py-6 px-6 rounded-md shadow-custom">
          <div className="flex mb-6 text-gray2 items-center gap-2">
            <FiPercent />
            <h1 className="font-bold">Taux d'avancement</h1>
          </div>
          <p className="text-gray3 text-[0.8rem] w-4/5 mb-4">
            Vous avez réalisés un taux de
            <span className=" text-[0.85rem] text-primary font-medium">
              {" "}
              {taux}%
            </span>
          </p>
          <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              class="bg-blue-600 h-3 rounded-full"
              style={{ width: `${taux}%` }}
            ></div>
          </div>
        </div>
        <div className="flex gap-4">
          <StatCard
            title={`Tâches Complétées`}
            value={tasksCompleted}
            icon={<FiCheckCircle />}
          />
          <StatCard
            title={"Tâches en Attente"}
            value={tasksPending}
            icon={<FiClock />}
          />
        </div>
      </div>
      <Messenger />
    </div>
  );
};

export default TableauDeBord;
