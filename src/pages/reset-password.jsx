import React, { useContext, useState } from "react";
import { logo } from "../assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../context/auth-context";
import LoadingSpinner from "../components/spinner";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ResetPassword = () => {
  const { resetPassword, isFetching } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    resetPassword(data.email);
 
  };


  return (
    <div className="flex h-full items-center justify-center font-eudox">
      <div className="w-2/5 mt-[60px] flex flex-col items-center">
        <div className="flex flex-col items-center w-[420px]">
          <img src={logo} alt="logo" className="mb-[32px] w-[137px]" />
          <h1 className="text-2xl mb-[18px] font-bold text-gray1">
            Oublié le mot de pass?
          </h1>
          <p className="text-sm text-gray3 mb-[45px]">
            Saisir votre email afin de récupérer votre compte
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
            <p className="font-bold text-[14px] mb-[6px] text-gray2">Email*</p>
            <input
              {...register("email")}
              type="text"
              name="email"
              placeholder="mail@esi-sba.dz"
              required
              className="border border-primary rounded-[5px] w-[420px] h-[50px] pl-[24px] text-gray3"
            />
            <p className="text-error ml-2 mt-2 text-sm">
              {errors.email && "Votre adresse email est invalide"}
            </p>
            <button
              className={`w-full h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[5px] text-white font-semibold ${
                isFetching ? "bg-opacity-75" : "bg-opacity-100  "
              }`}
              disabled={isFetching}
            >
              {isFetching ? <LoadingSpinner /> : "Rénitialiser le mot de pass"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
