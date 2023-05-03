import React, {useContext} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userPic } from '../assets';
import { useLocation, useParams } from 'react-router';
import AuthContext from '../context/auth-context';
import { format } from 'date-fns';


const shema = yup.object().shape({
  num_inscription : yup
  .string()
  .matches(/^\d{12}$/, 'numéro d\'inscription invalid' ), 
  matricule:  yup
  .string()
  .matches(/^\d{12}$/, 'matricule invalid' ), 
  birth_date: yup
  .date()
  .min(format(new Date(1950, 0, 1), 'yyyy-MM-dd'), 'date de naissaance invalide')
  .max(format(new Date(2015, 0, 1), 'yyyy-MM-dd'), 'date de naissaance invalide'), 
  phone_number: yup
  .string()
  .matches(/^(05|06|07)\d{8}$/, 'Numéro de téléphone invalid'),
  etablissement : yup.string(), 
  filière : yup.string(), 
  spacialite : yup.string(), 
  grade : yup.string(), 
});

const FillInfos = () => {
  const location = useLocation(); 
  const { completeStudentRegistration, completeTeacherRegistration } = useContext(AuthContext);



  const  {type, id} = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shema),
  });

  //id, num_inscription, birth_date, phone_number_number, etablissementlissement, filière, spécialité, profile_picture

  const submitForm = (data) => {
    
    
    console.log(data);

    if(type === "Student") {
      completeStudentRegistration(id, data.num_inscription, format(data.birth_date, 'yyyy-MM-dd'), data.phone_number, data.etablissement, data.filière, data.spécialité,  );
    } else if(type === "Teacher") {
      completeTeacherRegistration(id, data.matricule, format(data.birth_date, 'yyyy-MM-dd'), data.phone_number, data.etablissement, data.grade, data.spécialité, );
    }
    
  };
  

  const handleChange =() => {


  }


  return (
    <div className="flex h-screen items-center justify-center font-eudox bg-gray-50 overflow-auto">  
      <div className=" lg:w-[700px] sm:w-[500px] w-[470px] h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[5px] px-10 py-[48px]">

        <h1 className="text-xl mb-8 font-bold text-gray1 text-center">
        Completer le reste de votre informations 
        </h1>

        <h4 className=" sm:text-md text-center font-normal text-gray-500 mb-10 md:mb-14 mt-4">
        Nous avons besion des informations initialles pour demarer, saisire les informations  svuivantes pour continuer 
      </h4>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex w-full flex-col"
        >

          {/*  insc num or matricule  */}

          <p className="font-bold text-[13px] mb-[6px] mt-[32px] text-gray2">
            {(type === "Student") ? 'Numéro d\'inscription':'Matricule'}
          </p>
          <input
            {...register((type === "Student") ? 'num_inscription':'matricule')}
            type="text"
            name={(type === "Student") ? 'num_inscription':'matricule'}
            placeholder={(type === "Student") ? 'numéro d\'inscription doit contenir 12 chiffres ':'matricule doit contenir 12 chiffres'}
            className='rounded-[5px] w-auto h-[50px] pl-[24px] bg-gray-50 text-gray3'

          />
          <p className="text-error text-sm ml-1">
            {errors.num_inscription?.message}
          </p>
          


          {/* birth date   */}

          
          <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
          Date de naissance
          </p>
          <input
            {...register("birth_date")}
            type="date"
            name="birth_date"
            placeholder="JJ/MM/AAAA"
            className="text-[16px] rounded-[5px] bg-gray-50 w-auto h-[50px] pl-[24px] pr-4 text-gray3"
          />
          <p className="text-error text-sm ml-2">
            {errors.date?.message}
          </p>


          {/* phone_number num  */}



          <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
          Numéro de téléphone
          </p>
          <input
            {...register("phone_number")}
            type="text"
            name="phone_number"
            placeholder="0-xxx-xx-xx-xx"
            className="text-[16px] rounded-[5px] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
          />
          <p className="text-error text-sm ml-2">
            {errors.phone_number?.message}

          </p>  

          {/* etablissement  */}


          <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
           Etablissement
          </p>
          <input
            {...register("etablissement")}
            type="text"
            name="etablissement"
            placeholder="Ecole Supérieure en Informatique"
            className="text-[16px] rounded-[5px] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
          />


          <div className='flex gap-4 '>



          {/* filière ou grade */}


          <div className='w-[350px]'>
            <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
            {(type === "Student") ? 'Filière':'Grade'}
           </p>
           <input
            {...register( (type === "Student") ? 'filière':'grade')}
            type="text"
            name={(type === "Student") ? 'filière':'grade'}
            placeholder={(type === "Student") ? 'Saisir votre filière':'Saisir votre grade'}
            className="text-[16px] rounded-[5px] bg-gray-50 w-full h-[50px] pl-[24px] text-gray3"
           />

          </div>


                {/* spécialité */}


                <div className='w-[350px]'>
            <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">Spécialité
            
           </p>
           <input
            {...register('spécialité')}
            type="text"
            name="spécialité"
            placeholder='Saisir votre spécialité '
            className="text-[16px] rounded-[5px] bg-gray-50 w-full h-[50px] pl-[24px] text-gray3"
           />

          </div>

          
          </div>  
            {/* user pic  */}



          <div className='flex items-start justify-start mt-8'>
          <img className='w-[50px] h-[50px] mr-6' src={userPic} alt="userPic" />
            


           {/* change user pc button  */}

          <button
          onClick={handleChange} 
          className='border border-gray4 text-gray3 rounded-[5px] px-[44px] py-3 h-[50px]'>Changer photo</button>

          </div>
          
          
          <button
            className={`w-full h-[50px] bg-primary mt-[50px] mb-[25px] rounded-[5px] text-white font-semibold `}
          >
            Continuer
          </button>
        </form>
        <h1 className='text-xs text-gray3'> • Vous pouvez changer votre informations dans votre profile.</h1>
      </div>
  
  </div>
  )
}

export default FillInfos
