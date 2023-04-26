import React from 'react'
import { Navbar, Hero, Expalantion, Footer, Features } from '../components'

const LandingPage = () => {
  return (
    <div className=' bg-white_bg font-eudox w-full overflow-hidden'>
        <div className='lg:px-[140px] px-12 flex justify-center place-items-center'>
                <Navbar/>

        </div>

        <div className='lg:px-[194px] px-12 flex justify-center place-items-center'>   
                <Hero/>

        </div>
        <div className='lg:px-[0px] px-12 bg-accent py-[63px]'>
            <Expalantion/>

        </div>

        <div classname=' flex justify-center place-items-center'>
            <Features/>
            <Footer/>

        </div >



    </div>
  )
}

export default LandingPage