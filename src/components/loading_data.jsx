import React from "react";
import BlueLoadingSpinner from "./spinner_blue";

export const LoadingData = () => {
  return (
    <div className="flex flex-row gap-3 justify-center items-center h-full w-full">
      <BlueLoadingSpinner />
      <p className="text-md text-gray3">
        Nous préparons vos données, merci de patienter...
      </p>
    </div>
  );
};
