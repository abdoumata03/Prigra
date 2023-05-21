import React, { useContext, useState } from "react";
import { ReactComponent as Startup } from "../assets/illustrations/startup.svg";
import { ReactComponent as Brevet } from "../assets/illustrations/brevet.svg";
import TypeCard from "./project-type-card";
import ProfileContext from "../context/profile-context";
import { FiDownload, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

const ChooseType = () => {
  const { projectData, setType } = useContext(ProfileContext);

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
    <div className="flex flex-row items-start gap-16">
      <div className="w-1/2">
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
      <div className="bg-accent border px-8 py-6 rounded-[0.4rem] w-1/2 self-center">
        <div className="flex w-full gap-3">
          <div className="text-primary mt-1">
            <FiInfo />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-gray2 text-sm ">
              Vous pouvez consulter l'arrêté ministériel N° 1275 pour plus
              d'information sur la méchanisme "un diplôme-une startup et un
              diplôme-un brevet d'invention"
            </p>
            <a
              href="https://www.univ-usto.dz/wp-content/uploads/2022/11/1275.pdf"
              className="text-primary text-sm"
            >
              <div className="flex items-center gap-2">
                <FiDownload />
                Télécharger l'arrêté
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseType;
