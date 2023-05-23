import React from "react";
import { FiAtSign } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useFormContext } from "react-hook-form";

const ProfileInputField = ({ field_name, value, icon, name }) => {
  const uneditable = [
    "full_name",
    "email",
    "num_inscription",
    "etablissment",
    "filière",
    "spécialité",
  ];

  const { register } = useFormContext();

  return (
    <div>
      {field_name && (
        <p className="text-[13px] font-medium text-gray3 mb-1">{field_name}</p>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IconContext.Provider
              value={{ className: "text-primary opacity-50" }}
            >
              {icon}
            </IconContext.Provider>
          </div>
        )}
        <input
          {...(!uneditable.includes(name) ? register(name) : {})}
          type={name === "birth_date" ? "date": undefined}
          defaultValue={value}
          disabled={uneditable.includes(name)}
          className={`shadow-custom ${
            icon ? `pl-10` : `pl-5`
          } border-[1px] rounded-[0.4rem] w-full text-[12px] md:text-sm h-[35px] md:h-[45px] font-medium disabled:bg-white disabled:text-gray1 text-gray3`}
        />
      </div>
    </div>
  );
};

export default ProfileInputField;
