import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = ({title, path}) => {
  const navigate = useNavigate();
  return (
    <button
      className="w-full h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[5px] text-white font-semibold"
      onClick={() => navigate(path)}
    >
      {title}
    </button>
  );
};

export default LoginButton;
