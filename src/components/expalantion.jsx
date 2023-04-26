import React from 'react'
import {point, startup, statistic} from '../assets'
import {Btn} from '../components'

const Expalantion = () => {
  return (
    <section
    id='section-projects'
    className='2xl:px-[200px] px-0' >
        <h1 className='text-center lg:text-[40px] text-[28px] font-bold text-gray2 lg:mb-[118px] mb-[51px]'>Diplome Startup/Diplome Brevet </h1>
        <div className='flex flex-col md:items-center items-start mb-[103px]'>

            <div className='flex md:flex-row flex-col justify-between '>
                <div className='flex flex-col md:w-[400px]  h-[180px]'>
                    <div className='flex flex-row items-center w-[300px] '>
                        {/* <img src={point} alt="point" className='w-[10px] h-[10px]'/> */}
                        <h1 className='lg:text-[24px] text-[20px] text-gray1 font-bold'> Une soutenance avec startup</h1>
                    </div>
                    <p className='mt-4 text-gray3 lg:text-[16px] text-[14px]'>Une présentation d'un plan d'affaires détaillé incluant des recherches de marché, des projections financières et une analyse de la concurrence, devant un panel d'experts pour les convaincre de la viabilité de l'entreprise proposée et obtenir du soutien.</p>
                    

                </div>
             
                    <img 
                    src={startup} 
                    alt="startup" 
                    className='w-[303px] h-[236px] lg:ml-[210px] ml-0' />


            </div>

            <div className='flex md:flex-row flex-col justify-between mt-[46px]'>
                <img 
                src={statistic} 
                alt="startup" 
                className='md:block hidden w-[303px] h-[236px] lg:mr-[210px] mr-[30px]' />
                <div className='flex flex-col md:w-[400px]  h-[180px]'>

                    <div className='flex flex-row items-center w-[300px]'>
                        {/* <img src={point} alt="point" className='w-[10px] h-[10px]'/> */}
                        <h1 className='lg:text-[24px] text-[20px] text-gray1 font-bold' >Une soutenance avec brevet d'invetion</h1>
                    </div>

                    <p className='text-gray3 mt-4 lg:text-[16px] text-[14px]'>Une présentation d'invention, son fonctionnement, son utilité, sa pertinence et son originalité devant un panel d'experts pour les convaincre de sa valeur et de son potentiel dans le monde réel.</p>

                </div>
                <img 
                src={statistic} 
                alt="startup" 
                className='md:hidden block w-[303px] h-[236px] mr-[210px]' />
         
            
            </div>
            

        </div>
        <div className=' flex flex-col items-start lg:px-[140px] px-3 '>
            <p className='lg:text-[20px] text-[16px] text-gray1 mb-3'>Le ministère de ESRS a adressé une instruction visant à permettre aux étudiants qui obtiennent une moyenne excellente durant leur cursus de formation et lors de la soutenance du mémoire de fin d'études de bénéficier d'autorisation de création de start-up ou l'obtention de brevet d'invention, a indiqué lundi un communiqué du ministère.</p>
            <p className='underline mb-[40px]'>savoir plus</p>
        <Btn name='téléchargez larrêté ministériel'></Btn>
        </div>
        

    </section>
  )
}

export default Expalantion