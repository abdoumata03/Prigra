import React from "react";
import Tache from "./tache";

const Column = ({ data, titre, type }) => {
  const typeTasks = data.filter((item) => item.status === type);
  return (
    <div className="bg-white h-fit w-72 shadow-custom rounded-md py-6 px-4">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-gray1 text-lg font-bold">{titre}</h1>
        <div className="flex items-center justify-center bg-accent rounded-md h-6 w-6">
          <p className="text-sm">{typeTasks.length}</p>
        </div>
      </div>
      {typeTasks.map((item, index) => (
        <Tache key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Column;
