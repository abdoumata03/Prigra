import React from "react";

const ProjectInfoField = (props) => {
  return (
    <div className=" px-4 py-3 bg-white w-auto">
      <h1 className="text-xs text-gray3 mb-2 ">{props.title}</h1>
      <p
        className={`font-medium text-sm ${props.content?.includes("Non") &&
          `text-error text-opacity-90 text-sm`}`}
      >
        {props.content}
      </p>
    </div>
  );
};

export default ProjectInfoField;
