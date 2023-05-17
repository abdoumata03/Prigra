import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import { ReactComponent as Save } from "../assets/icons/save.svg";
import { ProfileInputField } from "../components/index.js";
import AuthContext from "../context/auth-context";
import BlueLoadingSpinner from "../components/spinner_blue";
import ProfileContext from "../context/profile-context";
import Breadcrumbs from "../components/breadcrumbs";

const Profile = () => {
  const { userData } = useContext(ProfileContext);

 
    return (
      <>
        <Breadcrumbs />
        <div className="flex flex-col">
          <div className="flex flex-col w-[90%] lg:w-full lg:flex-row gap-12">
            <div className="mb-0 lg:mb-8 w-auto lg:w-[40%]">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 mb-10">
                <img
                  src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
                  alt="Avatar Picture"
                  className="w-[110px] h-[110px] rounded-full mr-6"
                />
                <div className="flex flex-col items-start gap-2">
                  <button className="h-[45px] text-sm border border-primary text-primary font-bold rounded-[5px] px-5 w-full">
                    Changer la photo
                  </button>
                  <button className="h-[45px] border text-sm border-error font-bold text-error rounded-[5px] px-5 w-full flex justify-center items-center gap-3">
                    <Delete />
                    Supprimer
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <ProfileInputField
                  field_name={"Nom complet"}
                  value={userData?.first_name + " " + userData?.last_name}
                />
                <ProfileInputField
                  field_name={"Adresse email"}
                  value={userData?.email}
                />
                <ProfileInputField
                  field_name={"Numéro de téléphone"}
                  value={userData?.phone_number}
                />
                <ProfileInputField
                  field_name={"Date de naissance"}
                  value={userData?.birth_date}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-md">Informations académiques</h1>
                <ProfileInputField
                  field_name={"Numéro d'inscription"}
                  value={userData?.num_inscription}
                />
                <ProfileInputField
                  field_name={"Etablissement"}
                  value={userData?.etablissment}
                />
                <div className="flex gap-6">
                  <ProfileInputField
                    field_name={"Filière"}
                    value={userData?.filière}
                  />
                  <ProfileInputField
                    field_name={"Spécialité"}
                    value={userData?.spécialité}
                  />
                </div>
              </div>
              <button className="flex justify-center items-center gap-3 self-end h-[40px] md:h-[50px] bg-primary text-white text-sm md:text-md font-semibold rounded-[5px] px-5 mb-10 lg:mb-0 mt-10 w-full md:w-auto">
                <Save />
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </>
    );
};

export default Profile;
