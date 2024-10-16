import React, { useContext } from "react";
import LoginButton from "./login-button";
import AuthContext from "../context/auth-context";
import { FiCheckCircle } from "react-icons/fi";

const ResetPasswordSucces = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-4/5 md:w-2/5 h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[0.4rem] px-10 py-[48px]">
      <div className="bg-accent p-4 w-16 h-16 text-gray2 rounded-full flex items-center justify-center mb-5">
        <FiCheckCircle />
      </div>
      <h1 className="text-lg mb-2 font-bold text-gray1 text-center">
        Votre mot de pass a été reinitialisé avec succès
      </h1>
      <p className="text-sm w-4/5 text-gray2 text-center">
        Vous pouvez maintenant accéder a votre compte en utilisant votre nouveau
        mot de pass
      </p>
      {user ? (
        <LoginButton path={"/roles"} title={"Mon Compte"} />
      ) : (
        <LoginButton path={"/login"} title={"Se Connecter"} />
      )}
    </div>
  );
};

export default ResetPasswordSucces;
