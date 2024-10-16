import React, { useRef, useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../context/auth-context";
import LoadingSpinner from "../components/spinner.jsx";
import { Link, Navigate } from "react-router-dom";

import {
  login,
  logo,
  checkbox,
  shape1,
  shape2,
  shape3,
  center,
  arrows,
} from "../assets";
import { FiKey, FiMail } from "react-icons/fi";

const shema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(100)
    .required(),
});

const Login = () => {
  const { loginUser, isFetching } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shema),
  });

  const submitForm = (data) => {
    loginUser(data.email, data.password);
  };

  return (
    <div className="flex flex-row h-screen items-center justify-center lg:justify-normal font-eudox bg-white_bg">
      <div className="lg:w-1/2 w-5/6 md:w-3/4 2xl:mt-[0px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-start w-5/6 md:w-3/4">
          <img src={logo} alt="logo" className="mb-[32px] w-[137px]" />
          <h1 className="text-lg md:text-2xl mb-[4px] font-bold text-gray1">
            Se connecter
          </h1>
          <p className="text-xs md:text-xs text-gray3 mb-[45px]">
            Saisir vos informations pour continuer
          </p>
        </div>
        <div className="w-5/6 md:w-3/4 w-">
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
                className="shadow-custom border rounded-[0.4rem] w-full text-[0.85rem] md:text-sm pl-10 h-10 md:h-11 text-gray3"
                //   ref={inputRef}
              />
              <div className="absolute h-full flex items-center px-4 text-gray2">
                <FiMail />
              </div>
            </div>
            <p className="text-error ml-2">
              {errors.email && "Votre adresse email est invalide"}
            </p>

            <p className="font-medium text-xs mb-1 mt-[20px] text-gray3">
              Mot de pass<span className="text-error"> *</span>
            </p>
            <div className="relative flex item-center">
              <input
                {...register("password")}
                type="password"
                name="password"
                placeholder="Min 8 caractères"
                required
                className="shadow-custom border rounded-[0.4rem] w-full text-[12px] md:text-sm pl-10   h-10 md:h-11 text-gray3"
              />
              <div className="absolute h-full flex items-center px-4 text-gray2">
                <FiKey />
              </div>
            </div>
            <p className="text-error ml-2">
              {errors.password && "Votre mot de passe est très court"}
            </p>

            <div className="flex justify-end mt-[10px]">
              <p className="text-primary text-[13px] md:text-[15px]">
                <Link to="/forgot-password">Mot de passe oublié?</Link>
              </p>
            </div>

            <br />
            <div className="flex flex-col items-center">
              <button
                className={`w-full text-sm md:text-base h-10 md:h-11 bg-primary mt-[50px] mb-[8px] rounded-[0.4rem] text-white font-semibold ${
                  isFetching ? "bg-opacity-75" : "bg-opacity-100"
                }`}
                disabled={isFetching}
              >
                {isFetching ? <LoadingSpinner /> : "Continuer"}
              </button>
            </div>
            <p className="text-xs md:text-sm text-gray3">
              Vous n'avez pas encore un compte?{" "}
              <Link className="text-primary font-bold" to="/sign-up">
                Isncrire
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden absolute lg:flex justify-center items-center top-0 bottom-0 right-0 w-1/2 h-screen bg-primary-gradient">
        <img
          src={shape1}
          alt="shape1"
          className="absolute top-0 left-0 w-[140px]"
        />
        <img
          src={shape1}
          alt="shape1"
          className="absolute rotate-180 bottom-0 right-0 w-[210px] object-fit"
        />
        <div className="w-[500px]">
          <img src={center} alt="center" />
        </div>
      </div>
    </div>
  );
};

export default Login;
