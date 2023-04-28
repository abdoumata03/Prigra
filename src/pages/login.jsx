import React, { useRef, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthContext from "../context/auth-context";

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

const shema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(100).required(),
});

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  //   const inputRef = useRef(null);

  //   useEffect(() => {
  //     inputRef.current.focus();
  //   }, []);

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
    <div className="flex flex-row h-full font-eudox">
      <div className="lg:w-1/2 w-full 2xl:mt-[0px] mt-[51px] flex flex-col items-center">
        <div className="flex flex-col items-start w-[420px]">
          <img src={logo} alt="logo" className="mb-[32px] w-[137px]" />
          <h1 className="text-2xl mb-[4px] font-bold text-gray1">
             Se Connecter
          </h1>
          <p className="text-xs text-gray3 mb-[45px]">
            Saisir vos informations pour continuer
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
              //   ref={inputRef}
            />
            <p className="text-error ml-2">
              {errors.email && "votre adresse email est invalide"}
            </p>

            <p className="font-bold text-[14px] mb-[6px] mt-[20px] text-gray2">
              Mot de passe*
            </p>
            <input
              {...register("password")}
              type="password"
              name="password"
              placeholder="Min 8 caractères"
              required
              className="border border-primary rounded-[5px] w-[420px] h-[50px] pl-[24px] text-gray3"
            />
            <p className="text-error ml-2">
              {errors.password && "votre mot de passe est très court"}
            </p>

            <div className="flex justify-end mt-[10px]">
              <p className="text-primary text-[15px]">Mot de passe oublié?</p>
            </div>

            <br />
            <div className="flex flex-col items-center">
              <button className="w-full h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[5px] text-white font-semibold">
                Continue
              </button>
            </div>
            <p className="text-[14px]">
              Vous n'avez pas encore un compte? <span className="text-primary font-semibold">Isncrire</span>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden absolute lg:flex justify-center items-center top-0 bottom-0 right-0 w-1/2 h-screen bg-primary-gradient">
        <img src={shape1} alt="shape1" className="absolute top-0 left-0 w-[140px]" />
        <img
          src={shape1}
          alt="shape1"
          className="absolute rotate-180 bottom-0 right-0 w-[210px] object-fit"
        />
        <div className="w-[500px]">
          <img src={center} alt="center" />
        </div>
        {/* <p className='absolute top-[650px] left-[340px] text-[30px] w-[250px] text-white font-semibold text-center'>Turn your ideas into reality.</p>
            <img src={arrows} alt="arrows" className='absolute top-[750px] left-[412px] w-[100px]'/> */}
      </div>
    </div>
  );
};

export default Login;
