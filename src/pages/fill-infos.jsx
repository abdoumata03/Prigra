import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userPic } from '../assets';
import { useLocation } from 'react-router';

const shema = yup.object().shape({
  numInsc : yup.
  string(),
  //matches(/^\d{12}$/, 'numéro d\'inscription invalid' ), 
  matricule:  yup
  .string()
  .matches(/^\d{12}$/, 'matricule invalid' ), 
  birthDate: yup
  .date(),
  //.min(new Date(1950, 0, 1), 'date de naissaance invalide')
  //.max(new Date(2015, 0, 1), 'date de naissaance invalide'), 
  phone: yup
  .string()
  .matches(/^(05|06|07)\d{8}$/, 'numéro de téléphone invalid'),
  etab : yup.string(), 
  filiere : yup.string(), 
  spacialite : yup.string(), 
  grade : yup.string(), 
});

const FillInfos = () => {
  const location = useLocation(); 


  const student = location.state.data.dat;

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
            {student ? 'Numéro d\'inscription':'Matricule'}
          </p>
          <input
            {...register(student ? 'numInsc':'matricule')}
            type="text"
            name={student ? 'numInsc':'matricule'}
            placeholder={student ? 'numéro d\'inscription doit contenir 12 chiffres ':'matricule doit contenir 12 chiffres'}
            className='rounded-[5px] w-auto h-[50px] pl-[24px] bg-gray-50 text-gray3'

          />
          <p className="text-error text-sm ml-1">
            {errors.numInsc?.message}
          </p>
          


          {/* birth date   */}

          
          <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
          Date de naissance
          </p>
          <input
            {...register("birthDate")}
            type="date"
            name="birthDate"
            placeholder="JJ/MM/AAAA"
            className="text-[16px] rounded-[5px] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
          />
          <p className="text-error text-sm ml-2">
            {errors.date?.message}
          </p>


          {/* phone num  */}



          <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
          Numéro de téléphone
          </p>
          <input
            {...register("phone")}
            type="text"
            name="phone"
            placeholder="numéro de téléphone doit contenir 10 chiffres"
            className="text-[16px] rounded-[5px] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
          />
          <p className="text-error text-sm ml-2">
            {errors.phone?.message}
          </p>  

          {/* etab  */}


          <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
           établissement
          </p>
          <input
            {...register("etab")}
            type="text"
            name="etab"
            placeholder="école Supérieure en Informatique"
            className="text-[16px] rounded-[5px] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
          />


          <div className='flex gap-4 '>



          {/* filiere ou grade */}


          <div className='w-[350px]'>
            <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
            {student ? 'Filière':'Grade'}
           </p>
           <input
            {...register( student ? 'filiere':'grade')}
            type="text"
            name={student ? 'filiere*':'grade*'}
            placeholder={student ? 'saisir votre filiere':'saisir votre grade'}
            className="text-[16px] rounded-[5px] bg-gray-50 w-full h-[50px] pl-[24px] text-gray3"
           />

          </div>


                {/* specialite */}


                <div className='w-[350px]'>
            <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">Spécialité
            
           </p>
           <input
            {...register('specialite')}
            type="text"
            name="specialite"
            placeholder='saisir votre spécialité '
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
            onClick={()=> console.log(student)}
            className={`w-full h-[50px] bg-primary mt-[50px] mb-[25px] rounded-[5px] text-white font-semibold `}
          >
            Continuer
          </button>
        </form>
        <h1 className='text-xs text-gray3'> • Vous pouvez changer votre informations dans votre proflie.</h1>
      </div>
  
  </div>
  )
}

export default FillInfos