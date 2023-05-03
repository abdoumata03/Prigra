import React from "react";

const RoleCard = ({ icon, title, description }) => {
  return (
    <div className="w-3/4 md:w-1/4 px-6 py-8 flex flex-col items-center bg-white border rounded-md shadow-custom border-gray-200 hover:bg-accent hover:border-accent hover:shadow-none hover:cursor-pointer">
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
