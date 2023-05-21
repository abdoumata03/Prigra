import React, { useContext } from "react";
import { ReactComponent as Mail } from "../assets/illustrations/mail_sent.svg";
import { FiArrowLeft } from "react-icons/fi";
import AuthContext from "../context/auth-context";

const ResetPasswordConfirmation = () => {


 const {setIsValidEmail} = useContext(AuthContext);

  return (
    <>
      <div className="w-4/5 md:w-2/5 h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[0.4rem] px-10 py-[48px]">
        <div className="bg-accent p-4 w-[120px] h-[120px] rounded-md flex items-center justify-center mb-5">
          <Mail width="65x" height="58px" />
        </div>
        <h1 className="text-xl mb-8 font-bold text-gray1 text-center">
          Vérifiez votre boite e-mail
        </h1>
        <p className="text-sm text-gray2 text-center mb-4">
          Veuillez suivre le lien que nous avons envoyé à l'adresse e-mail que
          vous avez saisie précédemment. Si vous n'avez pas encore reçu le code,
          veuillez vérifier votre dossier de spam ou attendre quelques minutes
          avant de réessayer.
        </p>
      </div>
      <div
        onClick={() => setIsValidEmail(false)}
        className="flex items-center justify-center gap-3 mt-5 text-gray3 cursor-pointer py-1 px-2 "
      >
        <FiArrowLeft />
        <p className="text-sm font-medium">Renvoyer l'email</p>
      </div>
    </>
  );
};

export default ResetPasswordConfirmation;
