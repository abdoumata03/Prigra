import React from "react";

const ProfileInputField = ({field_name, value}) => {
  return (
    <div>
      <p className="text-[13px] font-medium text-gray3 mb-1">{field_name}</p>
      <div>
        <input
          value={value}
          disabled
          className="shadow-custom rounded-[5px] w-full text-[12px] md:text-sm pl-5 h-[35px] md:h-[45px] font-medium disabled:bg-white disabled:text-gray1 text-gray3"
        />
      </div>
    </div>
  );
};

export default ProfileInputField;
