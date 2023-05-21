import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = ({ title, path }) => {
  const navigate = useNavigate();
  return (
    <button
      className="w-full text-sm font-bold h-10 md:h-11 bg-primary mt-[50px] mb-[8px] rounded-[0.4rem] text-white"
      onClick={() => navigate(path)}
    >
      {title}
    </button>
  );
};

export default LoginButton;
