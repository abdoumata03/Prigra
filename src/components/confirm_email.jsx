import React from "react";
import { ReactComponent as Mail } from "../assets/illustrations/mail_sent.svg";

const ConfirmEmail = () => {
  return (
    <div className="w-4/5 md:w-2/5 flex flex-col items-center justify-center bg-white shadow-custom rounded-[5px] px-10 py-[48px]">
      <div className="bg-accent p-4 w-[120px] h-[120px] rounded-md flex items-center justify-center mb-5">
        <Mail width="65x" height="58px" />
      </div>
      <h1 className="text-2xl mb-8 font-bold text-gray1 text-center">
        Activer votre compte
      </h1>
      <p className="text-sm text-gray2 text-center mb-4">
       Veulliez cliquer le button ci-dessous pour activer votre compte 
      </p>
      <button className="w-full text-sm md:text-base h-[40px] md:h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[5px] text-white font-semibold">
        Activer mon compte
      </button>
    </div>
  );
};

export default ConfirmEmail;
