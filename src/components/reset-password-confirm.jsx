import React, { useContext } from "react"
import { ReactComponent as Mail } from "../assets/illustrations/mail_sent.svg";
import AuthContext from "../context/auth-context";




const ResetPasswordConfirmation = () => {


  return (
      <div className="w-2/5 h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[5px] px-10 py-[48px]">
        <div className="bg-accent p-4 w-[120px] h-[120px] rounded-md flex items-center justify-center mb-5">
        <Mail width="65x" height="58px"/>   
        </div>
        <h1 className="text-2xl mb-8 font-bold text-gray1 text-center">Vérifier votre boite e-mail</h1>
        <p className="text-sm text-gray2 text-center mb-4">
          Veuillez suiver le lien que nous avons envoyé à l'adresse e-mail que
          vous avez saisie précédemment. Si vous n'avez pas encore reçu le code,
          veuillez vérifier votre dossier de spam ou attendre quelques minutes
          avant de réessayer.
        </p>
      </div>
  );
};

export default ResetPasswordConfirmation;
