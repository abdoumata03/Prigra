import React from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {login, logo} from '../assets'


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
        <div className='w-1/2 flex flex-col justify-center items-center'  >
         <div>
            <img src={logo} alt="logo"  className=''/>
         </div>
         <div>Heureux de vous revoir !</div>
         <div>
            <form onSubmit={handleSubmit(submitForm)}>
                <p>Email*</p> 

                <br />

                <input
                {...register('email')}
                 type="text" 
                 name='email' 
                 placeholder='m.berrached@esi-sba.dz' 
                 required/>
                 <p>{errors.email && 'votre adresse email est invalide'}</p>


                <br/>

                <p>Mot de passe*</p>
                <br />    

                <input 
                {...register('password')}
                type="text" 
                name='password' 
                placeholder='Min 8 caractères' 
                required/>
                <p>{errors.password && 'votre mot de passe est très court'}</p>
                <div>
                        <p>Se Souvenir de moi</p>
                    </div>
                    <p>Mot de passe oublié?</p>

                <br/>
                <button>Continue</button>
            </form>
         </div>
        </div>
        <div className='md:w-1/2'>
            <img src={login} alt="login" className=' 2xl:block hidden w-full h-max' />

        </div>

        

    </div>
  )
}

export default Login
