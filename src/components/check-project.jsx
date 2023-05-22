import React from "react";
import { checkBox, checkedBox } from "../assets";

const CheckProject = ({ name, onclick, clicked }) => {
  return (
    <div
      onClick={onclick}
      className="flex flex-row items-center mb-4 font-medium"
    >
      <img src={clicked ? checkedBox : checkBox} alt="checkbox" />
      <h1 className="ml-4 text-sm text-gray1">{name}</h1>
    </div>
  );
};
export default CheckProject;
