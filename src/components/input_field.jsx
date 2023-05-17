import React from "react";
import { IconContext } from "react-icons";
import { useFormContext } from "react-hook-form";

const ProjectInputField = ({
  name,
  field_name,
  value,
  hint,
  defaultValue,
  obligatory,
  icon,
}) => {
  const { register } = useFormContext();

  return (
    <div>
      <p className="text-[13px] font-medium text-gray3 mb-1">
        {field_name}
        {obligatory && <span className="text-error">*</span>}
      </p>

      {field_name !== "Description" && field_name !== "Nom scientifique" ? (
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
            {...register(name)}
            name={name}
            value={value}
            defaultValue={defaultValue}
            placeholder={hint}
            className={`shadow-custom border-[1px] rounded-[0.4rem] w-full text-[12px] md:text-sm ${
              icon ? `pl-10` : `pl-5`
            }  h-[30px]  ${
              field_name === "Description"
                ? `md:h-40 resize-none leading-tight`
                : `md:h-[42px]`
            } font-medium disabled:bg-white disabled:text-gray1 text-gray3`}
          />
        </div>
      ) : (
        <textarea
          {...register(name)}
          name={name}
          maxLength={field_name === "Description" && 250}
          defaultValue={defaultValue}
          className={`${
            field_name === "Description" ? `h-36` : `h-16`
          } resize-none w-full border rounded-md py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          placeholder={hint}
        />
      )}
    </div>
  );
};

export default ProjectInputField;
