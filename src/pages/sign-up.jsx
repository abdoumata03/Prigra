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
import { FiKey, FiMail, FiUnlock, FiUser } from "react-icons/fi";

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
    <div className="flex flex-row h-full justify-center items-center font-eudox bg-white_bg min-h-screen">
      <div className="lg:w-5/6 w-full mt-[50px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center w-1/2">
          <h1 className="text-3xl mb-1 font-bold text-gray1">Créer un compte</h1>
          <p className="text-sm text-gray3 mb-4">
            Saisir vos informations personelles pour continuer
          </p>
        </div>
        <div className="w-2/3">
          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
            {/* nom  */}
            <div className="flex gap-10">
              <div className="flex flex-col grow">
                <p className="font-medium text-xs mb-1 mt-[20px] text-gray2">
                  Nom<span className="text-error"> *</span>
                </p>
                <div className="relative flex items-center">
                  <input
                    {...register("firstName")}
                    type="text"
                    name="firstName"
                    placeholder="saisir votre nom"
                    required
                    className="text-base rounded-[0.4rem] border bg-white w-full h-10 md:h-11 pl-10 text-gray3"
                  />
                  <div className="absolute px-4 text-gray3">
                    <FiUser />
                  </div>
                </div>
                {/* prenom */}

                <p className="font-medium text-xs mb-1 mt-[20px] text-gray2">
                  Prénom<span className="text-error"> *</span>
                </p>
                <div className="relative flex items-center">
                  <input
                    {...register("lastName")}
                    type="text"
                    name="lastName"
                    placeholder="saisir votre prénom"
                    required
                    className="text-[16px] rounded-[0.4rem] border bg-white w-full h-10 md:h-11 pl-10 text-gray3"
                  />
                  <div className="absolute px-4 text-gray3">
                    <FiUser />
                  </div>
                </div>
                {/* email */}

                <p className="font-medium text-xs mb-1 mt-[20px] text-gray2">
                  Email<span className="text-error"> *</span>
                </p>
                <div className="relative flex items-center">
                  <input
                    {...register("email")}
                    type="text"
                    name="email"
                    placeholder="mail@esi-sba.dz"
                    required
                    className="text-[16px] rounded-[0.4rem] border bg-white w-full h-10 md:h-11 pl-10 text-gray3"
                  />
                  <div className="absolute px-4 text-gray3">
                    <FiMail />
                  </div>
                </div>
                <p className="text-error text-sm ml-2">
                  {errors.email && errors.email?.message}
                </p>
              </div>

              {/* password */}

              <div className="flex flex-col grow">
                <p className="font-medium text-xs mb-1 mt-[20px] text-gray2">
                  Mot de pass<span className="text-error"> *</span>
                </p>
                <div className="flex items-center relative">
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    placeholder="min 8 caractères"
                    required
                    className="text-[16px] rounded-[0.4rem] border bg-white w-full h-10 md:h-11 pl-10 text-gray3"
                  />
                  <div className="absolute px-4 text-gray3">
                    <FiKey />
                  </div>
                </div>
                <p className="text-error text-sm ml-2">
                  {errors.password && errors.password?.message}
                </p>

                {/* confirm password */}

                <p className="font-medium text-xs mb-1 mt-[20px] text-gray2">
                  Confirmez le mot de pass<span className="text-error"> *</span>
                </p>
                <div className="relative flex items-center">
                  <input
                    {...register("confirm_password")}
                    type="password"
                    name="confirm_password"
                    placeholder="min 8 caractères"
                    required
                    className="text-[16px] rounded-[0.4rem] border bg-white w-full h-10 md:h-11 pl-10 text-gray3"
                  />
                  <div className="absolute px-4 text-gray3">
                    <FiKey />
                  </div>
                </div>
                <p className="text-error text-sm ml-2">
                  {errors.confirm_password && errors.confirm_password?.message}
                </p>
              </div>
            </div>

            <button className="w-1/2 self-center h-10 md:h-11 bg-primary mt-12 mb-2 rounded-[0.4rem] border text-white font-bold">
              Continuer
            </button>

            <p className="text-sm mb-11 self-center text-gray2">
              Vous avez déja un compte?{" "}
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
