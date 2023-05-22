import React, { useContext, useState } from "react";
import ProjectContext from "../context/project-context";
import {
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiPercent,
  FiX,
} from "react-icons/fi";
import StatCard from "../components/stat-card";
import Messenger from "../components/messenger";
import ProfileContext from "../context/profile-context";

const EncDashboard = () => {
  const { tasksData } = useContext(ProjectContext);
  const { projectData } = useContext(ProfileContext);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const onHideEdit = () => {
    setIsEditDialogOpen(false);
  };

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const tasksCompleted = tasksData.filter((item) => item.status === "Complétée")
    .length;
  const tasksPending = tasksData.filter(
    (item) => item.status === "En cours" || item.status === "À faire"
  ).length;

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="flex flex-col gap-4 w-full lg:w-2/5">
        <div className="bg-white flex-grow py-6 px-6 rounded-md shadow-custom">
          <div className="flex justify-between mb-6">
            <div className="flex text-gray2 items-center gap-2">
              <FiPercent />
              <h1 className="font-bold">Taux d'avancement</h1>
            </div>
            <div
              onClick={openEditDialog}
              className="bg-info h-9 w-9 flex items-center justify-center rounded-md text-white cursor-pointer"
            >
              <FiEdit3 />
            </div>
          </div>
          <p className="text-gray3 text-[0.8rem] w-4/5 mb-4">
            Le projet est à
            <span className=" text-[0.85rem] text-primary font-medium">
              {" 50% "}
            </span>
            d'avancement
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div
              class="bg-blue-600 h-3 rounded-full"
              // style={{ width: `${taux}%` }}
            ></div>
          </div>
        </div>
        <div className="flex gap-3 lg:gap-0 lg:justify-between">
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

        {isEditDialogOpen && (
          <div className="fixed inset-0 px-10 flex items-center justify-center bg-black bg-opacity-25">
            <div className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center">
              <div className="flex flex-col items-start py-4 px-10 w-full">
                <div className="flex items-center gap-20 mb-4 w-full">
                  <h1 className="text-gray1 text-lg font-bold flex-1 ">
                    Mettre à jour l'état d'avancement du projet
                  </h1>
                  <div
                    onClick={onHideEdit}
                    className="text-gray3 cursor-pointer"
                  >
                    <FiX />
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  className="w-full border"
                  step={5}
                />
              </div>
              <div className="w-full flex-col md:flex-row flex items-center justify-end gap-2 px-8 h-fit py-4 bg-gray-100 rounded-b-lg">
                <div
                  onClick={onHideEdit}
                  className="flex flex-row justify-center px-5 py-3 rounded-[0.4rem] cursor-pointer border bg-white "
                >
                  <h1 className=" text-gray2">Annuler</h1>
                </div>
                <button className="flex flex-row items-center gap-2 rounded-[0.4rem] px-5 py-3 text-white bg-info cursor-pointer">
                  <FiCheck />
                  <h1>Confirmer</h1>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex grow">
        <Messenger id={projectData?.id} />
      </div>
    </div>
  );
};

export default EncDashboard;
