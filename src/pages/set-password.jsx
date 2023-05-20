import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ResetPasswordSucces from "../components/reset-password-success";
import AuthContext from "../context/auth-context";
import { useParams } from "react-router";
import { FiKey } from "react-icons/fi";

const shema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères.")
    .max(100)
    .required("Ce champs est obligatoire"),
  confirm_password: yup
    .string()
    .required("Ce champs est obligatoire")
    .oneOf([yup.ref("password"), null], "Mots de pass ne sont pas identiques"),
});

const SetPassword = () => {
  const { isResetSuccess, resetPassword } = useContext(AuthContext);
  const { uid, token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shema),
  });

  const submitForm = (data) => {
    resetPassword(uid, token, data.password);
  };

  return (
    <div className="flex h-screen items-center justify-center font-eudox bg-gray-50">
      {isResetSuccess ? (
        <ResetPasswordSucces />
      ) : (
        <div className="w-2/5 h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[0.4rem] px-10 py-[48px]">
          <h1 className="text-xl mb-8 font-bold text-gray1 text-center">
            Réinitialiser votre mot de pass
          </h1>
          <ul className="text-xs text-gray3 self-start mb-4">
            <li className="mb-2">Votre mot de passe:</li>
            <li>• Ne peut pas être similaire à vos autres informations.</li>
            <li>• Doit contenir au moins 8 caractères.</li>
            <li>• Ne peut pas être entièrement numérique.</li>
          </ul>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex w-full flex-col"
          >
            <p className="font-medium text-xs mb-1 mt-[20px] text-gray2">
              Nouveau mot de pass<span className="text-error"> *</span>
            </p>
            <div className="relative flex items-center">
              <input
                {...register("password")}
                type="password"
                name="password"
                placeholder="Min 8 caractères"
                required
                className="rounded-[0.4rem] border w-full h-10 md:h-11 pl-10 text-[0.85rem] md:text-sm bg-gray-50 text-gray3"
              />
              <div className="absolute h-full flex items-center px-4 text-gray3">
                <FiKey />
              </div>
            </div>
            <p className="text-error text-sm ml-2">
              {errors.password && errors.password?.message}
            </p>
            <p className="font-medium text-xs mb-1 mt-[20px] text-gray2">
              Confirmez le nouveau mot de pass
              <span className="text-error"> *</span>
            </p>
            <div className="relative flex item-center">
              <input
                {...register("confirm_password")}
                type="password"
                name="confirm_password"
                placeholder="Min 8 caractères"
                required
                className="border pl-10 rounded-[0.4rem] w-full h-10 md:h-11 text-[0.85rem] md:text-sm bg-gray-50 text-gray3"
              />
              <div className="absolute h-full flex items-center px-4 text-gray3">
                <FiKey />
              </div>
            </div>
            <p className="text-error text-sm ml-2">
              {errors.confirm_password && errors.confirm_password?.message}
            </p>
            <button
              className={`w-full h-10 md:h-11 bg-primary mt-[50px] mb-[8px] rounded-[0.4rem] text-white font-bold text-sm`}
            >
              Confirmer
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SetPassword;
