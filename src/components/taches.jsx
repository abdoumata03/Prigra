import React, { useContext } from "react";
import Tache from "./tache";
import Column from "./column";
import { data } from "autoprefixer";
import ProjectContext from "../context/project-context";

const Tasks = () => {
  const { tasksData } = useContext(ProjectContext);

  return (
    <div className="flex gap-4">
      <Column titre={"A faire"} type={"TO DO"} data={tasksData} />
      <Column titre={"En cours"} type={"ATTENTE"} data={tasksData} />
      <Column titre={"Complétées"} type={"DONE"} data={tasksData} />
    </div>
  );
};

export default Tasks;
