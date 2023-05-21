import React, {useState} from 'react'
import { Vector} from '../assets'
import {CheckProject, FileInput} from '../components/index.js'


const PopUpReponse = (props) => {

    const [approve, setApprove] = useState(false); 
    const [refuse, setRefuse] = useState(false);
    const [approveReserve, setApproveReserve] = useState(false);
    const [pme, setPme] = useState(false);
    const [description, setDescription] = useState('');

    const handleSubmit = () => {

    }

    const handleValidation = () => {
        setApprove(preApprove => !preApprove );
        setRefuse(false);
        setApproveReserve(false);
        setPme(false);
    }

    const handleRefus = () => {
        setRefuse(preRefuse => !preRefuse);
        setApprove(false);
        setApproveReserve(false);
        setPme(false);
    }

    const handleValidationReserve = () => {
        setApproveReserve(preApproveReserve => !preApproveReserve);
        setApprove(false);
        setRefuse(false);
        setPme(false);
    }

    const handlePme = () => {
        setPme(prePme => !prePme);
        setApprove(false);
        setApproveReserve(false);
        setRefuse(false);
    }

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="absolute w-4/5 h-4/5 rounded bg-white_bg px-10 py-10  overflow-auto  ">
            <div className='flex-col'>
                <div className='flex flex-row justify-between'>
                    <div className='w-1/2 flex flex-col'>
                        <h1 className='text-[20px] font-medium mb-10 text-gray2'>Indiquez votre décision :</h1>
                        <CheckProject name='Projet éligible pour sturtup ( Valider )' clicked={approve} onclick={handleValidation}/>
                        <CheckProject name='Projet éligible pour un PFE classique ( Refuser )' clicked={refuse} onclick={handleRefus}/>
                        <CheckProject name='Projet éligible avec rèserves' clicked={approveReserve} onclick={handleValidationReserve}/>
                        <CheckProject name='Projet éligible pour PME' clicked={pme} onclick={handlePme}/>
                        <div>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder={refuse? 'Motif' : 'Description'}
                                className="w-[95%] h-60 resize-none outline-none px-5 py-5 mt-10 border rounded-[0.4rem]"
                            />
                        </div>
                    </div>
                    <div className='w-1/2'>
                      <FileInput/>
                    </div>
                </div>
                <div className='absolute right-10 flex flex-row justify-end items-end gap-5 bottom-10'> 
                    <div 
                    onClick={props.onclick}
                    className='flex w-max flex-row px-5 py-3 rounded-[0.4rem] cursor-pointer border border-gray4' >
                            <h1 className=' text-gray3'>Annuler</h1>
                    </div>             
                    <div 
                    onClick={handleSubmit}
                    className='flex w-max flex-row px-5 py-3 bg-success text-white rounded-[0.4rem] cursor-pointer' >
                            <img src={Vector} alt="valider" />
                            <h1 className='ml-2'>Envoyer réponse</h1>
                    </div>
                </div>
            </div> 
        </div>
    </div>
  )
}
export default PopUpReponse