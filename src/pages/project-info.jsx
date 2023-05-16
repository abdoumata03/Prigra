import React, {useContext, useState} from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Calendar, Delete, Edit} from '../assets';
import {ProjectInfoField, PersonField, PopUpReponse} from '../components/index.js'
import ProjectContext from '../context/project-context';


const ProjectInfo = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const projectData= location.state; 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const {deleteProject} = useContext(ProjectContext); 
    const [projectDeleted, setProjectDeleted] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
      };
      
    const closePopup = () => {
        setIsPopupOpen(false);
      };

      const openDeletePopup = () => {
        setIsDeletePopupOpen(true);
      };
      
    const closeDeletePopup = () => {
        setIsDeletePopupOpen(false);
      };
   
   const handleBack =()=>{
    navigate('/comite-projects');
   } 

   const handleReponce = () => {
    openPopup();
  };
  
   const handleDelete = () => {
    openDeletePopup();

   }

   const handleConfirmDelete = () => {
    deleteProject(projectData.id);
    setProjectDeleted(true);
    navigate('/comite-projects',
     {state : setProjectDeleted });

 }



  return (
    <div className='w-[90%] flex flex-col mt-20 mb-20'>
        <div className=' flex lg:flex-row flex-col mt-10 lg:gap-10 gap-0'>       
            <div className=' lg:w-3/5 w-full flex flex-col'>
                <ProjectInfoField title='Nom scientifique' content={projectData.nom_scientifique}/>
                <ProjectInfoField title='Nom commercial' content={projectData.nom_commercial}/>
                <ProjectInfoField title='Description de projet' content={projectData.description}/>
                <ProjectInfoField title='Fichier attaché'/>
                <div className='w-full flex flex-row gap-3'>
                <ProjectInfoField title='Type de projet' content={projectData.type}/>  
                <ProjectInfoField title='Status de projet' content={projectData.status_reponse}/>        
                </div>                  
            </div>
            <div className=' lg:w-2/5 w-full flex flex-col mb-10' >
                    <div className=' w-full flex flex-row px-5 py-3 bg-white mb-3 rounded-[5px] border items-center'>
                        <img src={Calendar} alt="calendar" className='w-[30px] h-[30px]'/>
                        <div className='ml-4'>
                        <h1 className='text-[14px] text-gray3 mb-2 '>Date de soumission </h1>
                        <p className='font-medium'>25/04/2023</p>
                        </div>
                    </div>
                    <div className='lg:overflow-auto lg:h-[600px] h-auto '>
                    <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3 ">
                        <p className="text-[13px] font-medium text-gray3 mb-2 ">
                            Porteur de projet
                        </p>
                        <PersonField name={projectData?.owner} email='c.belbachir@esi-sba.dz'/>

                    </div>
                    <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
                        <p className="text-[13px] font-medium text-gray3 mb-2 ">
                            Encadrant
                        </p>
                        <div >
                        {projectData.encadrant?.map((Enc, index) => (
                            <PersonField name={Enc.full_name} email={Enc.email} key={index}/>
                        ))}
                        </div>
                        
                    </div>
                    <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3">
                        <p className="text-[13px] font-medium text-gray3 mb-2 ">
                            Co-Encadrants
                        </p>
                        <div >
                        {projectData.co_encadrant?.map((coEnc, index) => (
                            <PersonField name={coEnc.full_name} email={coEnc.email}/>
                        ))}
                        </div>      
                    </div>
                    <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border">
                    <p className="text-[13px] font-medium text-gray3 mb-2 ">
                        Membres de l'equipe 
                    </p>
                    {projectData.members?.map((member, index) => (
                       <PersonField name=' Belbachir Chaimaa' email={member.email}/>
                    ))}
                   
                    </div>
                   
                </div>
                
            </div>
        </div>
          {/* actions */}
        <div className='flex flex-row justify-between'>
            <div 
            className='flex flex-row px-5 py-3 bg-info text-white rounded-[5px] cursor-pointer'
            onClick={handleReponce}>
                <img src={Edit} alt="edit" />
                <h1 className='ml-2'>Réponse</h1>
            </div>
          </div>
          <div className="lg:overflow-auto lg:h-100 h-auto ">
            <div className="bg-white rounded-[5px] shadow-custom flex flex-col justify-center py-3 px-5 border mb-3 ">
              <p className="text-[13px] font-medium text-gray3 mb-2 ">
                Porteur de projet
              </p>
              <PersonField
                name={projectData?.owner}
                email="c.belbachir@esi-sba.dz"
              />
            </div>
        </div>    
        {isPopupOpen && (
           <PopUpReponse onclick={closePopup}/>
         )}  
        {isDeletePopupOpen && (
           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className=" w-2/6 h-1/5 rounded bg-white_bg py-10 justify-center">
                    <h1 className=' text-[18px] text-gray2 mb-10 text-center'>Vous êtes sûr de supprimer ce projet ?</h1>
                    <div className='flex flex-row justify-center gap-5 bottom-10'> 
                        <div 
                        onClick={closeDeletePopup}
                        className='flex w-max flex-row px-5 py-3 rounded-[5px] cursor-pointer border border-gray4' >
                                <h1 className=' text-gray3'>Annuler</h1>
                        </div>             
                        <div 
                        className='flex flex-row px-5 py-3 text-white rounded-[5px] border border-error cursor-pointer'
                        onClick={handleConfirmDelete}>
                            <img src={Delete} alt="delete" />
                            <h1 className='ml-2 text-error'>Retirer</h1>
                        </div>
                    </div>
                </div>
           </div>
         )}   
    </div>  
  )
}
export default ProjectInfo
