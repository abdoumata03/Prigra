import React, { useContext, useState } from "react";
import { logo } from "../assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../context/auth-context";
import LoadingSpinner from "../components/spinner";
import { ResetPasswordConfirmation } from "../components/index.js";
import { FiArrowLeft, FiKey, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
});

const ResetPassword = () => {
  const { forgotPassword, isFetching, isValidEmail } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    forgotPassword(data.email);
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center font-eudox bg-gray-50">
      {isValidEmail ? (
        <ResetPasswordConfirmation />
      ) : (
        <>
          <div className="w-4/5 md:w-1/2 lg:w-1/3 bg-white shadow-custom py-8 px-12 rounded-lg flex flex-col items-center">
            <div className="flex flex-col items-center w-full">
              {/* <img src={logo} alt="logo" className="mb-[60px] w-[120px]" /> */}
              <div className="flex bg-accent rounded-full mb-5 h-14 w-14 items-center justify-center text-gray3">
                <FiKey />
              </div>
              <h1 className="text-xl mb-[0.4rem] font-bold text-gray1">
                Oublié le mot de pass?
              </h1>
              <p className="text-sm text-gray3 mb-[40px] text-center">
                Saisir votre email afin de récupérer votre compte
              </p>
            </div>
            <div className="w-full">
              <form
                onSubmit={handleSubmit(submitForm)}
                className="flex flex-col w-full"
              >
                <p className="font-medium text-xs mb-1 mt-[20px] text-gray3">
                  Email<span className="text-error"> *</span>
                </p>
                <div className="relative flex item-center">
                  <input
                    {...register("email")}
                    type="text"
                    name="email"
                    placeholder="mail@esi-sba.dz"
                    required
                    className="bg-gray-50 border rounded-[0.4rem] w-full text-[12px] md:text-sm pl-10 h-10 md:h-11 text-gray3"
                    //   ref={inputRef}
                  />
                  <div className="absolute h-full flex items-center px-4 text-gray3">
                    <FiMail />
                  </div>
                </div>
                <p className="text-error mt-1.5 text-xs mb-2">
                 {errors.email && "• Votre adresse email est invalide"}
                </p>
                <button
                  className={`w-full h-10 md:h-11 text-sm bg-primary mt-4 rounded-[0.4rem] text-white font-bold ${
                    isFetching ? "bg-opacity-75" : "bg-opacity-100  "
                  }`}
                  disabled={isFetching}
                >
                  {isFetching ? (
                    <LoadingSpinner />
                  ) : (
                    "Rénitialiser le mot de pass"
                  )}
                </button>
              </form>
            </div>
          </div>
          <div
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-3 mt-5 text-gray3 cursor-pointer py-1 px-2 "
          >
            <FiArrowLeft />
            <p className="text-sm font-medium">Retour à la connexion</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
