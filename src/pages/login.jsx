import React from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {login, logo, checkbox} from '../assets'


const shema = yup.object().shape({
    email : yup.string().email().required(), 
    password :  yup.string().min(8).max(100).required(), 
})


const Login = () => {

    const {register, handleSubmit, formState :{errors}} = useForm({
        resolver : yupResolver(shema),
    })

    const submitForm = (data) => {}


  return (

    <div className='flex flex-row items-center'>
        <div className='2xl:w-1/2 w-full 2xl:mt-[0px] mt-[51px] flex flex-col items-center '  >
         <div className='flex flex-col items-center '> 
            <img src={logo} alt="logo"  className='pb-[50px] w-[137px]'/>
            <h1 className='text-4xl mb-[66px] font-semibold text-gray1'>Heureux de vous revoir !</h1>
         </div>
         <div>
            <form onSubmit={handleSubmit(submitForm)} className='flex flex-col'> 
                <p className='font-bold mb-[14px] text-gray2'>Email*</p> 
                <input
                {...register('email')}
                 type="text" 
                 name='email' 
                 placeholder='m.berrached@esi-sba.dz' 
                 required
                 className='border border-primary rounded-[10px] w-[442px] h-[50px] pl-[24px] text-gray3'/>
                 <p className='text-error ml-2'>{errors.email && 'votre adresse email est invalide'}</p>

                <p className='font-bold mb-[14px] mt-[45px] text-gray2'>Mot de passe*</p>
                <input 
                {...register('password')}
                type="text" 
                name='password' 
                placeholder='Min 8 caractères' 
                required
                className='border border-primary rounded-[10px] w-[442px] h-[50px] pl-[24px] text-gray3'/>
                <p className='text-error ml-2'>{errors.password && 'votre mot de passe est très court'}</p>

              <div className='flex justify-between mt-[20px]'>
                <div className='flex'>
                    <img src={checkbox} alt="checkbox" />
                    <p className='ml-2'>Se Souvenir de moi</p>
                    

                </div>
                    
                    <p className='text-primary underline'>Mot de passe oublié?</p>
              </div>
                    

                <br/>
                <div className='flex flex-col items-center'>
                <button className='w-[239px] h-[55px] bg-primary mt-[90px] rounded-[5px] text-white font-semibold' >Continue</button>

                </div>
                
            </form>
         </div>
         </div>
         <div className='2xl:w-1/2'>
            <img src={login} alt="login" className=' 2xl:block hidden w-full h-full' />

        </div>

        

    </div>
  )
}

export default Login
