import React from "react";

const SignUpField = ({label, name, placeholder}) => {
  return (
    <>
      <p className="font-bold text-[14px] mb-[6px] text-gray2">{label}*</p>
      <input
        {...register(name)}
        type="text"
        name={name}
        placeholder={placeholder}
        required
        className="text-[16px] rounded-[0.4rem] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
      />
    </>
  );
};

export default SignUpField;
