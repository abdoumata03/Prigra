import React, { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userPic } from "../assets";
import { useParams } from "react-router";
import AuthContext from "../context/auth-context";
import { format } from "date-fns";
import ConfirmEmail from "../components/confirm_email";

const shema = yup.object().shape({
  num_inscription: yup
    .string(), 
    //.matches(/^\d{12}$/, "numéro d'inscription invalid"),
  matricule: yup
  .string(), 
  //.matches(/^\d{12}$/, "matricule invalid"),
  birth_date: yup
    .date()
    .nullable()
    .min(
      format(new Date(1950, 0, 1), "yyyy-MM-dd"),
      "date de naissaance invalide"
    )
    .max(
      format(new Date(2015, 0, 1), "yyyy-MM-dd"),
      "date de naissaance invalide"
    ),
  phone_number: yup
    .string(), 
    //.matches(/^(05|06|07)\d{8}$/, "Numéro de téléphone invalid"),
  etablissement: yup.string(),
  filière: yup.string(),
  spacialite: yup.string(),
  grade: yup.string(),
  profile_picture: yup
  .mixed(), 
});

const FillInfos = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { type, id } = useParams();
  const hiddenFileInput = React.useRef(null);

  const {
    completeStudentRegistration,
    completeTeacherRegistration,
    isEmailActivated,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shema),
  });

  const submitForm = (data) => {
    console.log(data);

    if (type === "Student") {
      completeStudentRegistration(
        id,
        data.num_inscription,
        format(data.birth_date, "yyyy-MM-dd"),
        data.phone_number,
        data.etablissement,
        data.filière,
        data.spécialité, 
        selectedImage, 
      );
    } else if (type === "Teacher") {
      completeTeacherRegistration(
        id,
        data.matricule,
        format(data.birth_date, "yyyy-MM-dd"),
        data.phone_number,
        data.etablissement,
        data.grade,
        data.spécialité, 
        selectedImage, 
      );
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    setSelectedImage(URL.createObjectURL(fileUploaded));
  };

  return (
    <div className={`flex items-center ${!isEmailActivated? `h-screen` : `h-auto`} justify-center font-eudox bg-gray-50 overflow-auto`}>
      {isEmailActivated ? (
        <div className=" lg:w-[55%] sm:w-3/5 w-[90%] my-14 flex flex-col items-center justify-center bg-white shadow-custom rounded-[5px] px-10 py-[48px]">

          <div className="w-full flex justify-center items-center text-success font-medium border border-success text-center h-12 rounded-[5px] mb-5">
            Votre compte a été activé avec succés
          </div>

          <h1 className="text-xl font-bold text-gray1 text-center">
            Completer le reste de votre informations
          </h1>

          <h4 className=" sm:text-md text-center font-normal text-gray-500 mb-10 md:mb-3 mt-2">
            Nous avons besion des informations suivantes pour compléter
            l'inscription
          </h4>

          <form
            onSubmit={handleSubmit(submitForm)}
            className="flex w-full flex-col"
          >
            {/*  insc num or matricule  */}
            <p className="font-bold text-[13px] mb-[6px] mt-[30px] text-gray2">
              {type === "Student" ? "Numéro d'inscription" : "Matricule"}
            </p>
            <input
              {...register(
                type === "Student" ? "num_inscription" : "matricule"
              )}
              type="text"
              name={type === "Student" ? "num_inscription" : "matricule"}
              placeholder={
                type === "Student"
                  ? "Saisir votre numéro d'inscription "
                  : "Saisir votre matricule"
              }
              className="rounded-[5px] w-auto h-[50px] pl-[24px] bg-gray-50 text-gray3"
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

            {/* filière ou grade */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="w-full">
                <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
                  {type === "Student" ? "Filière" : "Grade"}
                </p>
                <input
                  {...register(type === "Student" ? "filière" : "grade")}
                  type="text"
                  name={type === "Student" ? "filière" : "grade"}
                  placeholder={type === "Student" ? "MI" : "Maitre Assistant"}
                  className="text-[16px] rounded-[5px] bg-gray-50 w-full h-[50px] pl-[24px] text-gray3"
                />
              </div>

              {/* spécialité */}
              <div className="w-full">
                <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
                  Spécialité
                </p>
                <input
                  {...register("spécialité")}
                  type="text"
                  name="spécialité"
                  placeholder="Informatique"
                  className="text-[16px] rounded-[5px] bg-gray-50 w-full h-[50px] pl-[24px] text-gray3"
                />
              </div>
            </div>

            <div className="flex items-center flex-row justify-start mt-8 ">
              
              {/* change user pic */}
              <div 
              onClick={handleClick} 
              className="w-[50px] h-[50px] mr-6 ">
              {selectedImage ? (
              <img 
              src={selectedImage} 
              alt="user pic" 
              className="w-[50px] h-[50px] mr-6 rounded-[360px]"/>
              ) : (
              <img 
              src={userPic} 
              alt="user pic" 
              className="w-[50px] h-[50px] mr-6 rounded-[360px]"/>
              )}
            </div>
             <button
                onClick={handleClick}
                className="border border-gray4 text-gray3 rounded-[5px] px-[44px] py-3 h-[50px]"
              >
                Changer photo
              </button>
            <input
                  {...register("profile_picture")}
                  type="file"
                  name="profile_picture"
                  accept=".jpg, .jpeg, .png"
                  style={{display: 'none'}}
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  className="border border-gray4 text-gray3 rounded-[5px] px-[44px] py-3 h-[50px]"
                />             
            </div>

            {/* submit button */}
            <button className={`w-full h-[50px] bg-primary mt-[50px] mb-[25px] rounded-[5px] text-white font-semibold `}>
              Continuer
            </button>
          </form>

          <h1 className="text-xs text-gray3">
            {" "}
            • Vous pouvez changer votre informations dans votre profile.
          </h1>
        </div>
      ) : (
        <ConfirmEmail />
      )}
    </div>
  );
};

export default FillInfos;
