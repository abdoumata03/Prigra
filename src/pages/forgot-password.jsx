import React, { useContext, useState } from "react";
import { logo } from "../assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../context/auth-context";
import LoadingSpinner from "../components/spinner";
import { ResetPasswordConfirmation } from "../components/index.js";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ResetPassword = () => {
  const { forgotPassword, isFetching, isValidEmail } = useContext(AuthContext);

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
    <div className="flex h-screen w-full items-center justify-center font-eudox bg-gray-50">
      {isValidEmail ? (
        <ResetPasswordConfirmation />
      ) : (
        <div className="w-4/5 md:w-1/2 lg:w-1/3 flex flex-col items-center">
          <div className="flex flex-col items-center w-full">
            <img src={logo} alt="logo" className="mb-[60px] w-[120px]" />
            <h1 className="text-2xl mb-[0.4rem] font-bold text-gray1">
              Oublié le mot de pass?
            </h1>
            <p className="text-sm text-gray3 mb-[40px] text-center">
              Saisir votre email afin de récupérer votre compte
            </p>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col w-full">
              <p className="font-bold text-[14px] mb-[6px] text-gray2">
                Email*
              </p>
              <input
                {...register("email")}
                type="text"
                name="email"
                placeholder="mail@esi-sba.dz"
                required
                className="shadow-custom rounded-[0.4rem] w-full h-[50px] pl-[24px] text-gray3"
              />
              <p className="text-error ml-2 mt-2 text-sm">
                {errors.email && "Votre adresse email est invalide"}
              </p>
              <button
                className={`w-full h-[50px] bg-primary mt-[50px]  rounded-[0.4rem] text-white font-semibold ${
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
      )}
    </div>
  );
};

export default ResetPassword;
