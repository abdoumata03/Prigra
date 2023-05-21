import React from "react";

const StatCard = ({ title, value, icon }) => {

  return (
    <div className="bg-white border border-gray-100 rounded-[0.4rem] shadow-custom h-fit py-8 px-6 w-48">
      <div className="rounded-full text-gray2 bg-accent h-12 w-12 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-gray3 text-sm mb-4 w-1/2">{title}</h3>
      <h1 className="text-gray1 text-2xl font-bold">{value}</h1>
    </div>
  );
};

export default StatCard;
