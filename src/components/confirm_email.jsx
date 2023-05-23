import React from "react";
import { ReactComponent as Mail } from "../assets/illustrations/mail_sent.svg";
import { useParams } from "react-router";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
import { Toaster, toast } from "react-hot-toast";

const ConfirmEmail = () => {
  const { activateEmail } = useContext(AuthContext);
  const { uid, token } = useParams();

  const handleClick = async () => {
    await toast.promise(activateEmail(uid, token), {
      loading: "En train d'activer votre compte..",
      success: "Votre compte a été activé",
      error: "Erreur lors de l'activation de votre compte",
    });
  };

  return (
    <div className="w-4/5 md:w-2/5 flex flex-col items-center justify-center bg-white shadow-custom rounded-[0.4rem] px-10 py-[48px]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-accent p-4 w-[120px] h-[120px] rounded-md flex items-center justify-center mb-5">
        <Mail width="65px" height="58px" />
      </div>
      <h1 className="text-2xl mb-8 font-bold text-gray1 text-center">
        Activer votre compte
      </h1>
      <p className="text-sm text-gray2 text-center mb-4">
        Veulliez cliquer le button ci-dessous pour activer votre compte
      </p>
      <button
        onClick={handleClick}
        className="w-full text-sm md:text-base h-[40px] md:h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[0.4rem] text-white font-semibold"
      >
        Activer mon compte
      </button>
      <button onClick={handleClick}></button>
    </div>
  );
};

export default ConfirmEmail;
