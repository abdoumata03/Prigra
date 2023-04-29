import React from 'react'
import { Navigate, useNavigate } from 'react-router'

const VerifyEmail = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center font-eudox bg-gray-50">
        <div className="w-2/5 h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[5px] px-10 py-[48px]">
            <h1 className='text-5 text-center text-gray1'>Vous allez recevoir une notification dans votre boîte email pour valider votre inscription et compléter le reste de vos informations.</h1>
            <h6 className='text-[12px] text-gray3 mt-24'>N'avez-vous pas reçu de confirmation par e-mail ?</h6>
            <button
                onClick={() => navigate('/fill-infos')}
                className="w-1/2 h-[50px] bg-primary mt-[10px] mb-[8px] rounded-[5px] text-white font-semibold"
                >Continuer
              </button>
            
    </div>
    </div>
    
  )
}

export default VerifyEmail