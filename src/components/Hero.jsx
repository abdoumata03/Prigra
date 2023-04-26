import React from 'react'
import Btn from './Btn'
import { circles1, circles2, circles3, waves } from '../assets'

const Hero = () => {
  return (
    <section
    id='section-hero'
     className=' py-[60px] relative'>
      <div className='flex flex-col items-center justify-center'>

        <h1 className='lg:text-[56px] text-[40px] font-bold text-gray1 2xl:mx-[150px] text-center mb-10 sm:mt-[50px]'>
        Plateforme de Suivi des Projets de Soutenances
        <span className='text-primary'> DS/DB</span>
      </h1>

      <p className='2xl:px-[194px] lg:text-[24px] text-[16px] text-gray2 text-center mb-[78px]'>Dans un seul espace, Prigra améliore l'efficacité et l'organisation des projets startup & brevets d'invention dans le cadre de soutnance.</p>
      
      <Btn name='Commencer'/>
      
      {/* <img src={waves} alt="waves" className=' w-[100px] h-[100px] mt-[38px] sm:ml-[300px] mr-[250px]'/> */}
      </div>

      {/* <img src={circles1} alt="circles1" className='md:block hidden flex-1 absolute h-[48px] w-[51px] right-10 lg:top-20 top-10' />
      <img src={circles2} alt="circles2" className='md:block hidden absolute h-[46px] w-[77px] right-10 sm:bottom-20 ' />
      <img src={circles3} alt="circles3" className='md:block hidden absolute h-[47px] w-[75px] left-10 lg:top-20 top-10' />
       */}
      
    </section>
  )
}

export default Hero
