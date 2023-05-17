import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingSpinner from "../components/spinner.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  email: yup
    .string()
    .email("votre addresse email est invalide ")
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .min(8, "votre mot de passe doit contenir au moins 8 caractères.")
    .max(100)
    .required("Ce champs est obligatoire"),
  confirm_password: yup
    .string()
    .required("Ce champs est obligatoire")
    .oneOf([yup.ref("password"), null], "mots de pass ne sont pas identiques"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shema),
  });

  const submitForm = (data) => {
    const inicialData = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    navigate("/users", { state: inicialData });
  };

  return (
    <div className="flex flex-row h-full justify-center items-center font-eudox">
      <div className="lg:w-5/6 w-full mt-[50px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center w-1/2">
          <img src={logo} alt="logo" className="mb-[32px] w-[110px]" />
          <h1 className="text-3xl mb-[4px] font-bold text-gray1">S'inscrire</h1>
          <p className="text-sm text-gray3 mb-[45px]">
            Saisir vos informations pour continuer
          </p>
        </div>
        <div className="w-1/2">
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
            {/* nom  */}

            <p className="font-bold text-[14px] mb-[6px] text-gray2">Nom*</p>
            <input
              {...register("firstName")}
              type="text"
              name="firstName"
              placeholder="saisir votre nom"
              required
              className="text-[16px] rounded-[0.4rem] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
            />

            {/* prenom */}

            <p className="font-bold text-[14px] mb-[6px] mt-[20px] text-gray2">
              Prénom*
            </p>
            <input
              {...register("lastName")}
              type="text"
              name="lastName"
              placeholder="saisir votre prénom"
              required
              className="text-[16px] rounded-[0.4rem] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
            />

            {/* email */}

            <p className="font-bold text-[14px] mb-[6px] mt-[20px] text-gray2">
              Email*
            </p>
            <input
              {...register("email")}
              type="text"
              name="email"
              placeholder="mail@esi-sba.dz"
              required
              className=" bg-gray-50 rounded-[0.4rem] w-full h-[50px] pl-[24px] text-gray3"
            />
            <p className="text-error text-sm ml-2">
              {errors.email && errors.email?.message}
            </p>

            {/* password */}

            <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
              Mot de pass*
            </p>
            <input
              {...register("password")}
              type="password"
              name="password"
              placeholder="min 8 caractères"
              required
              className="rounded-[0.4rem] w-auto h-[50px] pl-[24px] bg-gray-50 text-gray3"
            />
            <p className="text-error text-sm ml-2">
              {errors.password && errors.password?.message}
            </p>

            {/* confirm password */}

            <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
              Confirmer le mot de pass*
            </p>
            <input
              {...register("confirm_password")}
              type="password"
              name="confirm_password"
              placeholder="min 8 caractères"
              required
              className="text-[16px] rounded-[0.4rem] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
            />
            <p className="text-error text-sm ml-2">
              {errors.confirm_password && errors.confirm_password?.message}
            </p>

            <br />

            <button className="w-full h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[0.4rem] text-white font-semibold">
              Continuer
            </button>

            <p className="text-[14px] mb-11">
              Vous avez un compte?{" "}
              <Link className="text-primary font-semibold" to="/login">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
