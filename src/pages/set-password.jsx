import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ResetPasswordSucces from "../components/reset_password_success";
import AuthContext from "../context/auth-context";
import { useParams } from "react-router";

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
  const {uid, token} = useParams();

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
        <div className="w-2/5 h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[5px] px-10 py-[48px]">
          <h1 className="text-2xl mb-8 font-bold text-gray1 text-center">
            Réinitialiser votre mot de pass
          </h1>
          <ul className="text-xs text-gray3">
            <li>
              • Votre mot de passe ne peut pas être similaire à vos autres
              informations.
            </li>
            <li>• Votre mot de passe doit contenir au moins 8 caractères.</li>
            <li>
              • Votre mot de passe ne peut pas être entièrement numérique.
            </li>
          </ul>
          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex w-full flex-col"
          >
            <p className="font-bold text-[13px] mb-[6px] mt-[32px] text-gray2">
              Nouveau mot de pass*
            </p>
            <input
              {...register("password")}
              type="password"
              name="password"
              placeholder="Min 8 caractères"
              required
              className="rounded-[5px] w-auto h-[50px] pl-[24px] bg-gray-50 text-gray3"
            />
            <p className="text-error text-sm ml-2">
              {errors.password && errors.password?.message}
            </p>
            <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
              Confirmer le nouveau mot de pass*
            </p>
            <input
              {...register("confirm_password")}
              type="password"
              name="confirm_password"
              placeholder="Min 8 caractères"
              required
              className="text-[16px] rounded-[5px] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
            />
            <p className="text-error text-sm ml-2">
              {errors.confirm_password && errors.confirm_password?.message}
            </p>
            <button
              className={`w-full h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[5px] text-white font-semibold`}
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
