import React, { useContext, useEffect, useState } from "react";
import RoleCard from "./role-card";
import { ReactComponent as Startup } from "../assets/illustrations/startup.svg";
import { ReactComponent as Brevet } from "../assets/illustrations/brevet.svg";
import TypeCard from "./project-type-card";
import ProjectContext from "../context/project-context";
import ProfileContext from "../context/profile-context";

const ChooseType = () => {
  const { setType } = useContext(ProjectContext);
  const { projectData } = useContext(ProfileContext);
  const [startup, setStartup] = useState(projectData?.type === "Startup");
  const [brevet, setBrevet] = useState(projectData?.type === "Brevet");

  const StartupClicked = () => {
    setStartup(true);
    setBrevet(false);
    setType("Startup");
  };

  const BrevetClicked = () => {
    setStartup(false);
    setBrevet(true);
    setType("Brevet");
  };

  return (
    <div className="flex flex-col items-start">
      <p className="font-medium text-base text-gray1 mb-8">
        Commencez par choisir votre type de projet
      </p>
      <div className="flex flex-col gap-3 w-full">
        <TypeCard
          title={"Startup"}
          icon={<Startup />}
          description={"Un Diplome - Une Startup"}
          onClick={StartupClicked}
          clicked={startup}
        />
        <TypeCard
          title={"Brevet d'invention"}
          icon={<Brevet />}
          description={"Un Diplome - Un Brevet"}
          onClick={BrevetClicked}
          clicked={brevet}
        />
      </div>
    </div>
  );
};

export default ChooseType;
