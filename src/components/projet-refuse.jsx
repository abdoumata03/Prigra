import React, { useContext } from "react";
import { FiDownload } from "react-icons/fi";
import ProfileContext from "../context/profile-context";

const Refused = () => {
  const { projectData } = useContext(ProfileContext);
  return (
    <div className="flex flex-col gap-6 bg-white border shadow-custom w-3/5 py-8 px-6 rounded-[0.4rem] ">
      <p className="text-gray2">
        Cher utilisateur,
        <br />
        <br /> Nous regrettons de vous informer que votre projet a été{" "}
        <span className="text-error font-medium">REJETÉ</span>
        <br />
        <br /> Veuillez consulter le rapport d'expertise joint pour obtenir des
        détails spécifiques sur les raisons du refus. <br />
        <br /> Nous encourageons vivement à prendre en compte les commentaires
        et les recommandations mentionnés dans le rapport d'expertise afin
        d'améliorer votre projet pour de futures soumissions. <br />
        <br /> Nous vous remercions de votre compréhension et restons à votre
        disposition pour toute autre question.
        <br />
        <br /> Cordialement.
      </p>
      <a
        href={projectData.rapport_expertise.url}
        target="_blank"
        className="bg-primary rounded-md px-4 text-white w-fit flex gap-3 items-center py-2"
      >
        <FiDownload />
        Rapport d'expertise
      </a>
    </div>
  );
};

export default Refused;
