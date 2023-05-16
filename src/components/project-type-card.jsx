import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { IconContext } from "react-icons";

const ProjectTypeCard = ({ title, icon, description, clicked, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-row w-full justify-start items-center h-24 border-[1px] px-8 rounded-[5px] ${
        clicked
          ? "bg-white outline outline-2 outline-primary outline-offset-0 shadow-none"
          : " bg-white  shadow-custom border-gray-200 hover:bg-gray-200 hover:border-accent hover:shadow-none hover:cursor-pointer"
      } hover:cursor-pointer`}
    >
      <div className="w-[50px] mr-6">{icon}</div>
      <div className="flex-1">
        <h5 className="text-base font-medium tracking-tight text-gray1">
          {title}
        </h5>
        <p className="text-xs font-normal text-gray3">{description}</p>
      </div>
      {clicked ? (
        <IconContext.Provider value={{ className: "text-primary" }}>
          <FiCheckCircle />
        </IconContext.Provider>
      ) : null}
    </div>
  );
};

export default ProjectTypeCard;
