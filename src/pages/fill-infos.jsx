import React, { useContext, useState, useEffect, useRef } from "react";
import { useForm, useController, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userPic } from "../assets";
import { useParams } from "react-router";
import AuthContext from "../context/auth-context";
import { format } from "date-fns";
import ConfirmEmail from "../components/confirm_email";
import { storage } from "../services/firebase.jsx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Select from "react-select";

const schema = yup.object().shape({
  num_inscription: yup.string().required("Ce champ est obligatoire"),
  //.matches(/^\d{12}$/, "numéro d'inscription invalid"),
  // matricule: yup.string().required("Ce champ est obligatoire"),
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
  phone_number: yup.string().required("Ce champ est obligatoire"),
  //.matches(/^(05|06|07)\d{8}$/, "Numéro de téléphone invalid"),
  etablissment: yup.string().required("Ce champ est obligatoire"),
  profile_picture: yup.mixed(),
  // filière: yup.string().required('Ce champ est obligatoire'),
  // spécialité: yup.string().required('Ce champ est obligatoire'),
});

const FillInfos = () => {
  // VAR DECLARATION

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [filiereOptions, setFiliereOptions] = useState(null);
  const [specialtyOptions, setSpecialtyOptions] = useState(null);
  const [selectedFiliere, setSelectedFiliere] = useState(null);
  const [specialtyValue, setSpecialtyValue] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const { type, id } = useParams();
  const selectSpecialtyRef = useRef();
  const hiddenFileInput = React.useRef(null);
  const {
    completeStudentRegistration,
    completeTeacherRegistration,
    isEmailActivated,
  } = useContext(AuthContext);

  const storageRef = ref(storage, `/images/${selectedImage?.name}`);
  const uploadTask = uploadBytesResumable(storageRef, selectedImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setSpecialtyOptions(
      selectedFiliere &&
        filieres
          .find((filiere) => filiere.filière === selectedFiliere.value)
          ?.spécialité.map((specialty) => ({
            value: specialty.spécialité,
            label: specialty.spécialité,
          }))
    );
  }, [selectedFiliere]);

  useEffect(() => {
    setSpecialtyValue({ value: "", label: "" });
  }, [selectedFiliere]);

  useEffect(() => {
    const fetchFilieres = async () => {
      try {
        const filieres_response = await fetch(
          "https://prigra.onrender.com/base/filières/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const filieres = await filieres_response.json();
        setFilieres(filieres);
        setFiliereOptions(
          filieres?.map((filiere) => ({
            value: filiere.filière,
            label: filiere.filière,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilieres();
  }, []);

  useEffect(() => {
    const fetchEtabs = async () => {
      try {
        const etablissements = await fetch(
          "https://prigra.onrender.com/base/Etablissment/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const etabs = await etablissements.json();
      } catch (error) {
        console.log(error);
      }
    };

    fetchEtabs();
  }, []);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const grades_resp = await fetch(
          "https://prigra.onrender.com/base/grades/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const grades = await grades_resp.json();
      } catch (error) {
        console.log(error);
      }
    };

    fetchGrades();
  }, []);


  const onInvalid = (errors) => console.error(errors)

  const submitForm = (data) => {

    // IMAGE UPLOAD

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageUrl(url);
        });
      }
    );

    if (type === "Student") {
      completeStudentRegistration(
        id,
        data.num_inscription,
        format(data.birth_date, "yyyy-MM-dd"),
        data.phone_number,
        data.etablissment,
        data.filière,
        data.spécialité,
        imageUrl
      );
    } else if (type === "Teacher") {
      completeTeacherRegistration(
        id,
        data.matricule,
        format(data.birth_date, "yyyy-MM-dd"),
        data.phone_number,
        data.etablissment,
        data.grade,
        data.spécialité,
        imageUrl
      );
    }
  };

  // HANDLE IMAGE UPLOAD

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setSelectedImage(fileUploaded);
    setImagePreview(URL.createObjectURL(fileUploaded));
  };

  return (
    <div
      className={`flex items-center ${
        !isEmailActivated ? `h-screen` : `h-auto`
      } justify-center font-eudox bg-gray-50 overflow-auto`}
    >
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
            onSubmit={handleSubmit(submitForm, onInvalid)}
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
            <p className="text-error text-sm ml-2">{errors.date?.message}</p>

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
              Etablissementtt
            </p>
            <input
              {...register("etablissment")}
              type="text"
              name="etablissment"
              placeholder="Ecole Supérieure en Informatique"
              className="text-[16px] rounded-[5px] bg-gray-50 w-auto h-[50px] pl-[24px] text-gray3"
            />
            <p className="text-error text-sm ml-1">
              {errors.etablissement?.message}
            </p>

            {/* filière ou grade */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="w-full">
                <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
                  {type === "Student" ? "Filière" : "Grade"}
                </p>

                <Controller
                  name="filière"
                  render={({ field: { onChange} }) => (
                    <Select
                      options={filiereOptions}
                      onChange={(val) => {
                        onChange(val.value);
                        setSelectedFiliere(val);
                      }}
                  
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
              </div>
              {/* <p className="text-error text-sm ml-1">
                {errors.filière?.message}
              </p> */}

              {/* spécialité */}
              <div className="w-full">
                <p className="font-bold text-[13px] mb-[6px] mt-[20px] text-gray2">
                  Spécialité
                </p>
                <Controller
                  name="spécialité"
                  render={({ field: { onChange } }) => (
                    <Select
                      ref={selectSpecialtyRef}
                      options={specialtyOptions}
                      isDisabled={selectedFiliere === null ? true : false}
                      className="h-[50px]"
                      onChange={(val) => {
                        onChange(val.value);
                        setSpecialtyValue(val.value);
                      }}
                      value={specialtyValue.value}
                    />
                  )}
                  control={control}
                  defaultValue=""
                />
              </div>
              {/* <p className="text-error text-sm ml-1">
                {errors.spécialité?.message}
              </p> */}
            </div>

            <div className="flex items-center flex-row justify-start mt-8 ">
              {/* change user pic */}
              <div onClick={handleClick} className="w-[50px] h-[50px] mr-6 ">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="user pic"
                    className="w-[50px] h-[50px] mr-6 rounded-[360px] object-contain"
                  />
                ) : (
                  <img
                    src={userPic}
                    alt="user pic"
                    className="w-[50px] h-[50px] mr-6 rounded-[360px]"
                  />
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
                style={{ display: "none" }}
                ref={hiddenFileInput}
                onChange={handleChange}
                className="border border-gray4 text-gray3 rounded-[5px] px-[44px] py-3 h-[50px]"
              />
            </div>

            {/* submit button */}
            <button
              className={`w-full h-[50px] bg-primary mt-[50px] mb-[25px] rounded-[5px] text-white font-semibold `}
            >
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
