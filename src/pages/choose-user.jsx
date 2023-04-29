import { useState } from "react";
import frContent from "../locale/fr.json";
import { RoleCard } from "../components/index.js";
import { ReactComponent as Etu } from "/src/assets/illustrations/etudiant.svg";
import { ReactComponent as Ens } from "/src/assets/illustrations/enseignant.svg";
import { Link, useNavigate } from 'react-router-dom';

const ChooseUser = () => {
    const navigate = useNavigate();
    const [etu, setEtu] = useState(false);
    const [ens, setEns] = useState(false);

  const {
    choose_roles_title,
    choose_roles_subtitle,
    etu_title,
    ens_title,   
  } = frContent;


  return (
    <div className="App font-eudox w-full md:h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl sm:text-3xl text-center font-bold mt-12 w-3/4 md:mt-12">
        {choose_roles_title}
      </h1>
      <h4 className="text-xs sm:text-md text-center font-normal text-gray-500 mb-10 md:mb-14 mt-4">
        {choose_roles_subtitle}
      </h4>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <RoleCard icon={<Etu />} title={etu_title}/>
        <RoleCard icon={<Ens/>} title={ens_title} />
        
      </div>
      <button
        onClick={()=> navigate('/verify-email')}
        className="text-white font-semibold px-20 py-3 mt-14 bg-primary hover:bg-primary_focused rounded-md"
      >
        Continuer
      </button>
    
    
    </div>
  );
};
export default ChooseUser;
