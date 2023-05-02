import React from "react";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import { ReactComponent as Save } from "../assets/icons/save.svg";
import { ProfileInputField } from "../components/index.js";

const Profile = () => {
  return (
    <div className="ml-11 w-full flex flex-col">
      <div>
        <h1 className="text-xl font-bold text-gray1">Mon Profile</h1>
        <p className="text-sm font-normal text-gray3 mb-6">
          Gérer les paramètres de votre profil
        </p>
      </div>
      <div className="flex flex-col w-[80%] lg:w-full lg:flex-row gap-10">
        <div className="mb-8 w-auto lg:w-[40%]">
          <div className="flex flex-row mb-10">
            <img
              src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
              alt="Avatar Picture"
              className="w-[110px] h-[110px] rounded-full mr-6"
            />
            <div className="flex flex-col items-start justify-between">
              <button className="h-[50px] border border-primary text-primary font-semibold rounded-[5px] px-5 w-full">
                Changer la photo
              </button>
              <button className="h-[50px] border border-error font-semibold text-error rounded-[5px] px-5 w-full flex justify-center items-center gap-3">
                <Delete />
                Supprimer
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <ProfileInputField
              field_name={"Nom complet"}
              value={"MATALLAH Abdallah"}
            />
            <ProfileInputField
              field_name={"Adresse email"}
              value={"a.matallah@esi-sba.dz"}
            />
            <ProfileInputField
              field_name={"Numéro de téléphone"}
              value={"0698 35 50 33"}
            />
            <ProfileInputField
              field_name={"Date de naissance"}
              value={"15/03/2003"}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-md">Informations académiques</h1>
            <ProfileInputField
              field_name={"Numéro d'inscription"}
              value={"ES22012022202037021326"}
            />
            <ProfileInputField
              field_name={"Etablissement"}
              value={"Ecole Supérieure en Informatique 08-Mai-1945"}
            />
            <div className="flex gap-6">
              <ProfileInputField field_name={"Filière"} value={"Sicence"} />
              <ProfileInputField
                field_name={"Spécialité"}
                value={"Informatique"}
              />
            </div>
          </div>
          <button className="w-auto flex justify-center items-center gap-3 self-end h-[50px] bg-primary text-white font-semibold rounded-[5px] px-5 "><Save/>Sauvegarder</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
