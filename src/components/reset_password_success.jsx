import React from "react";
import {ReactComponent as ResetSuccess} from "../assets/illustrations/reset_pass_success.svg";

const ResetPasswordSucces = () => {
  return (
    <div className="w-2/5 h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[5px] px-10 py-[48px]">
      <div className="bg-accent p-4 w-[120px] h-[120px] rounded-md flex items-center justify-center mb-5">
        <ResetSuccess width="65x" height="58px" />
      </div>
      <h1 className="text-2xl mb-8 font-bold text-gray1 text-center">
        Votre mot de pass a été reinitialisé avec succès
      </h1>
      <p className="text-sm text-gray2 text-center">
        Vous pouvez maintenant accéder a votre compte en utilisant votre nouveau mot de pass
      </p>
    </div>
  );
};

export default ResetPasswordSucces;
