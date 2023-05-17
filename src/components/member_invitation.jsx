import React from "react";

const MemberInvitaion = () => {
  return (
    <div>
      <p className="text-[13px] font-medium text-gray3 mb-1">
        {field_name}
        {obligatory && <span className="text-error">*</span>}
      </p>

      <input
        value={value}
        placeholder={hint}
        className={`shadow-custom border-[1px] rounded-[0.4rem] w-full text-[12px] md:text-sm pl-5 h-[30px]  ${
          field_name === "Description"
            ? `md:h-40 resize-none leading-tight`
            : `md:h-[42px]`
        } font-medium disabled:bg-white disabled:text-gray1 text-gray3`}
      />
    </div>
  );
};

export default MemberInvitaion;
