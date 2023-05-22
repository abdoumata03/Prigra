import React, { useContext } from "react";
import Column from "./column";
import ProjectContext from "../context/project-context";

const Tasks = () => {
  const { tasksData } = useContext(ProjectContext);

  return (
    <div className="flex gap-4">
      <Column titre={"À faire"} type={"À faire"} data={tasksData} />
      <Column titre={"En cours"} type={"En cours"} data={tasksData} />
      <Column titre={"Complétées"} type={"Complétée"} data={tasksData} />
    </div>
  );
}; 

export default Tasks;
