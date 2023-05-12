import React from "react";
import Select from "react-select";
import { customStyles } from "./select-style";
import { FiAtSign, FiMail, FiXCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";

const InviteEncadrant = ({
  field_name,
  value,
  hint,
  optional = true,
  onDelete,
}) => {
  const selectOptions = [
    { label: "Encadrant", value: "Encadrant" },
    { label: "Co-encadrant", value: "Co-encadrant" },
  ];

  return (
    <div className="flex gap-3 mb-2 items-center">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IconContext.Provider
            value={{ className: "text-primary opacity-50" }}
          >
            <FiMail />
          </IconContext.Provider>
        </div>
        <input
          value={value}
          placeholder={hint}
          className={`shadow-custom border-[1px] rounded-[5px] w-full text-[12px] md:text-sm pl-10 h-[30px]  ${
            field_name === "Description"
              ? `md:h-40 resize-none leading-tight`
              : `md:h-[42px]`
          } font-medium disabled:bg-white disabled:text-gray1 text-gray3`}
        />
      </div>
      <Select
        styles={customStyles}
        options={selectOptions}
        placeholder={"Type"}
        className="text-sm w-32 bg-accent"
      />

      {optional ? (
        <button onClick={onDelete}>
          <IconContext.Provider value={{ className: "stroke-error" }}>
            <FiXCircle />
          </IconContext.Provider>
        </button>
      ) : null}
    </div>
  );
};

export default InviteEncadrant;
