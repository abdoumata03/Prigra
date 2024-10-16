import React from "react";

const RoleCard = ({ icon, title, description, onClick, clicked }) => {
  return (
    <div
      onClick={onClick}
      className={` w-56 h-64 border px-6 py-6 flex flex-col justify-center rounded-md  ${
        clicked
          ? "bg-accent border-primary shadow-none"
          : " bg-white shadow-custom border-gray-200 hover:bg-accent hover:shadow-none hover:cursor-pointer"
      }`}
    >
      <div className="w-[140px] h-[92px]">{icon}</div>
      <div className="mt-12">
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-800">
          {title}
        </h5>
        <p className="text-gray-400 text-xs dark:text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};
export default RoleCard;
