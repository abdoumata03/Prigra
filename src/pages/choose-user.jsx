import { useState, useContext } from "react";
import frContent from "../locale/fr.json";
import { RoleCard } from "../components/index.js";
import { ReactComponent as Etu } from "/src/assets/illustrations/etudiant.svg";
import { ReactComponent as Ens } from "/src/assets/illustrations/enseignant.svg";
import { useNavigate, useLocation } from "react-router";
import React from 'react';
import AuthContext from "../context/auth-context";

const ChooseUser = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { signupUser, isFetching } = useContext(AuthContext);
  const [etu, setEtu] = useState(false);
  const [ens, setEns] = useState(false);
  const initialData = location.state;


  const {
    choose_roles_title,
    choose_roles_subtitle,
    etu_title,
    ens_title,
  } = frContent;

  const handleEtuClick = () => {
    setEtu(prevEtu => !prevEtu);
    if (setEns) setEns(false);
  }

  const handleEnsClick = () => {
    setEns(preEns => !preEns);
    if (setEtu) setEtu(false);

  }

  const handleClick = () => {
    

    if (etu) {
      const type= 'Student';
      signupUser(initialData.email, initialData.password, initialData.firstName, initialData.lastName, type);
      navigate('/verify-email', 
      {state: { data: true }}
      );
      
      
      

    } else if (ens) {
      const type= 'Teacher' ; 
      signupUser(initialData.email, initialData.password, initialData.firstName, initialData.lastName, type);   
      navigate('/verify-email', 
      {state: { data: false }}
      );
      
      
      
    }

  }

  return (
    <div className="App font-eudox w-full md:h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-xl sm:text-3xl text-center font-bold mt-12 w-3/4 md:mt-12">
        {choose_roles_title}
      </h1>
      <h4 className="text-md sm:text-md text-center font-normal text-gray-500 mb-10 md:mb-14 mt-4">
        {choose_roles_subtitle}
      </h4>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <RoleCard icon={<Etu />} title={etu_title} onClick={handleEtuClick} clicked={etu} />
        <RoleCard icon={<Ens />} title={ens_title} onClick={handleEnsClick} clicked={ens} />
      </div>
      <button
        onClick={handleClick}
        disabled={!etu && !ens}
        className="text-white font-semibold px-20 py-3 mt-14 bg-primary hover:bg-primary_focused rounded-md"
      >
        Continuer
      </button>
    </div>
  );
};

export default ChooseUser;
