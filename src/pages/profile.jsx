import React, { useContext, useEffect } from "react";
import { ReactComponent as Save } from "../assets/icons/save.svg";
import { ProfileInputField } from "../components/index.js";
import ProfileContext from "../context/profile-context";
import { useForm, FormProvider } from "react-hook-form";
import Breadcrumbs from "../components/breadcrumbs";
import { FiTrash2 } from "react-icons/fi";

let initialFormValues;

const Profile = () => {
  const { userData, putUserTypeInfo } = useContext(ProfileContext);

  const methods = useForm();

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  useEffect(() => {
    initialFormValues = getValues();
  }, []);

  const handleFormSave = () => {
    const formValues = getValues();

    const changedValues = {};

    for (const key in initialFormValues) {
      if (
        initialFormValues.hasOwnProperty(key) &&
        initialFormValues[key] !== formValues[key]
      ) {
        changedValues[key] = formValues[key];
      }
    }

    putUserTypeInfo(changedValues);
  };
  return (
    <>
      <Breadcrumbs />
      <div className="flex flex-col">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleFormSave)}
            className="flex flex-col w-[90%] lg:w-full lg:flex-row gap-12"
          >
            <div className="mb-0 lg:mb-8 w-auto lg:w-[40%]">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 mb-10">
                <img
                  src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
                  alt="Avatar Picture"
                  className="w-[110px] h-[110px] rounded-full mr-6"
                />
                <div className="flex flex-col items-start gap-2">
                  <button className="h-[45px] text-sm border border-primary text-primary font-bold rounded-[0.4rem] px-5 w-full">
                    Changer la photo
                  </button>
                  <button className="h-[45px] border text-sm border-error font-bold text-error rounded-[0.4rem] px-5 w-full flex justify-center items-center gap-3">
                    <FiTrash2 />
                    Supprimer
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <ProfileInputField
                  field_name={"Nom complet"}
                  name={"full_name"}
                  value={userData?.first_name + " " + userData?.last_name}
                />
                <ProfileInputField
                  field_name={"Adresse email"}
                  value={userData?.email}
                  name={"email"}
                />
                <ProfileInputField
                  field_name={"Numéro de téléphone"}
                  name={"phone_number"}
                  value={userData?.phone_number}
                />
                <ProfileInputField
                  field_name={"Date de naissance"}
                  name={"birth_date"}
                  value={userData?.birth_date}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-md">Informations académiques</h1>
                <ProfileInputField
                  field_name={"Numéro d'inscription"}
                  name={"num_inscription"}
                  value={userData?.num_inscription}
                />
                <ProfileInputField
                  field_name={"Etablissement"}
                  value={userData?.etablissment}
                  name={"etablissment"}
                />
                <div className="flex gap-6">
                  <ProfileInputField
                    field_name={"Filière"}
                    value={userData?.filière}
                    name={"filière"}
                  />
                  <ProfileInputField
                    field_name={"Spécialité"}
                    value={userData?.spécialité}
                    name={"spécialité"}
                  />
                </div>
              </div>
              <button className="flex justify-center items-center gap-3 self-end h-[40px] md:h-[50px] bg-primary text-white text-sm md:text-md font-semibold rounded-[0.4rem] px-5 mb-10 lg:mb-0 mt-10 w-full md:w-auto">
                <Save />
                Sauvegarder
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default Profile;
