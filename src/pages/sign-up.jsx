import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingSpinner from "../components/spinner.jsx";
import { Link, useNavigate } from 'react-router-dom';

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
  firstName: yup.string().required(),
  lastName: yup.string().required(), 
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
    console.log(data);
    reset();
  };

  return (
    <div className="flex flex-row h-full font-eudox">
      <div className="lg:w-1/2 w-full mt-[51px] flex flex-col items-center">
        <div className="flex flex-col items-start w-[420px]">
          <img src={logo} alt="logo" className="mb-[32px] w-[137px]" />
          <h1 className="text-2xl mb-[4px] font-bold text-gray1">
            S'inscrire
          </h1>
          <p className="text-xs text-gray3 mb-[45px]">
            Saisir vos informations pour continuer
          </p>
        </div>
        <div>

          <form onSubmit={handleSubmit(submitForm)} className="flex flex-col">
            <p className="font-bold text-[14px] mb-[6px] text-gray2">Nom*</p>

            <input
              {...register("firstName")}
              type="text"
              name="firstName"
              placeholder="saisir votre nom"
              required
              className="shadow-custom rounded-[5px] w-[420px] h-[50px] pl-[24px] text-gray3" 
            />

            <p className="font-bold text-[14px] mb-[6px] mt-[20px] text-gray2">Prénom*
            </p>
            <input
              {...register("lastName")}
              type="text"
              name="lastName"
              placeholder="saisir votre prénom"
              required
              className="shadow-custom rounded-[5px] w-[420px] h-[50px] pl-[24px] text-gray3"
            />

            <p className="font-bold text-[14px] mb-[6px] mt-[20px] text-gray2">Email*
            </p>
            <input 
            {...register("email")}
            type="text"
            name="email"
            placeholder="mail@esi-sba.dz"
            className="shadow-custom rounded-[5px] w-[420px] h-[50px] pl-[24px] text-gray3"
             />
            <p className="text-error ml-2">
              {errors.email && "votre adresse email est invalide"}
            </p>

            <br />  
            <div className="flex flex-col items-center">
                
              <button
                onClick={() => navigate('/users')}
                className="w-full h-[50px] bg-primary mt-[50px] mb-[8px] rounded-[5px] text-white font-semibold"
                >Continuer
              </button>
            </div>
            <p className="text-[14px]">
              Vous avez un compte?{" "}
              <Link className="text-primary font-semibold" to="/login">Se connecter</Link>
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
        {/* <p className='absolute top-[650px] left-[340px] text-[30px] w-[250px] text-white font-semibold text-center'>Turn your ideas into reality.</p>
            <img src={arrows} alt="arrows" className='absolute top-[750px] left-[412px] w-[100px]'/> */}
      </div>
    </div>
  )
}

export default SignUp