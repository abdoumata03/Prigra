import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import { ReactComponent as Save } from "../assets/icons/save.svg";
import { ProfileInputField } from "../components/index.js";
import AuthContext from "../context/auth-context";
import BlueLoadingSpinner from "../components/spinner_blue";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch_user = async () => {
      setIsLoading(true);
      const response_me = await fetch(
        "https://prigra.onrender.com/auth/users/me/",
        {
          method: "GET",
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem("authTokens")).access
            }`,
          },
        }
      );

      const me_data = await response_me.json();
      const user_type = me_data.type;
      const user_id = me_data.type_id;

      const fetch_user_type = await fetch(
        `https://prigra.onrender.com/base/${user_type}/${user_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem("authTokens")).access
            }`,
          },
        }
      );

      const user_type_data = await fetch_user_type.json();

      console.log(user_type_data);
      setUserData(user_type_data);
      setIsLoading(false);
    };

    fetch_user();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-row gap-3 justify-center items-center">
        <BlueLoadingSpinner />
        <p className="text-md text-gray3">
          Nous préparons vos données, merci de patienter...
        </p>
      </div>
    );
  } else {
    return (
      <div className="ml-11 w-full flex flex-col">
        <div className="mt-10 lg:mt-0">
          <h1 className="text-xl font-bold text-gray1">Mon Profile</h1>
          <p className="text-sm font-normal text-gray3 mb-6">
            Gérer les paramètres de votre profil
          </p>
        </div>
        <div className="flex flex-col w-[90%] lg:w-full lg:flex-row gap-12">
          <div className="mb-0 lg:mb-8 w-auto lg:w-[40%]">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 mb-10">
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
    );
  }
};

export default Profile;
