import React, {useState} from 'react'
import { logo } from '../assets'
import {useNavigate} from "react-router-dom"


const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className='w-full flex py-8 justify-between items-center'>
        <img src={logo} alt="logo" className=' w-[137px] h-[49px] '/>
        <ul className='list-none sm:flex hidden justify-center items-center flex-1 cursor-pointer text-gray1 font-medium'>
            <li >
                <a href="#section-projects" className='mr-8'>Soutenance DS/DB</a>
            </li>
            <li>
                <a href="#section-features">Caractéristiques</a>
            </li>
            <li className='ml-8'>
                <a href="#section-footer">Contact</a>
            </li>

        </ul>
        <button onClick={() => navigate('/login')} className=' lg:block hidden border border-primary text-primary font-bold px-3.5 py-2.5 rounded-[6px]' >Se Connecter</button>

    </nav>
  )
}

export default Navbar