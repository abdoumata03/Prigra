import React from "react";

const PersonField = (props) => {
  return (
    <div className="flex mb-3 items-center">
      <img
        src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
        alt="Avatar Picture"
        className="w-9 h-9 mr-4 rounded-full"
      />
      <div>
        <h1 className="text-sm font-medium text-gray1 mb-1">{props.name}</h1>
        <p className="text-xs font-regular text-gray3">{props.email}</p>
      </div>
    </div>
  );
};
export default PersonField;
