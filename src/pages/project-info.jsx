import React from 'react'
import { useLocation, useNavigate } from 'react-router'

const ProjectInfo = () => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const projectData= location.state; 
   
   const handleClick =()=>{
    navigate('/comite-projects');


   } 

  return (

    <div className='w-5/6 flex flex-row justify-between'>
        
        <div className=' w-3/5 flex flex-col'>

            <div 
            className=' px-3 py-3 bg-white mb-3 w-auto'>
            <h1>Titre du projet</h1>
            <p>{projectData.name}</p>
            </div>

            <div 
            className='bg-white px-3 py-3 mb-3 w-auto'>
            <h1>Description du projet</h1>
            <p>{projectData.description}</p>
            </div>

            <div 
            className='bg-white px-3 py-3 mb-3 w-auto'>
            <h1>Fichier attaché</h1>
            <p>{projectData.description}</p>
            </div>
       
        </div>
        <div className='flex flex-col'>
            <div 
            className=' px-3 py-3 bg-white mb-3 w-auto'>
            <h1>Titre du projet</h1>
            <p>{projectData.name}</p>
            </div>


        </div>
       

    </div>
  )
}

export default ProjectInfo