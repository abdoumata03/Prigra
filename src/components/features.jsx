import React from 'react'
import { features } from '../constants'

const Features = () => {
  return (
    <section
    id='section-features'
    className='lg:px-[0px] px-12 overflow-hidden'>
        <h1 className='text-center lg:text-[40px] text-[28px] font-bold text-gray2 mb-[51px] 2xl:px-[450px] px-0 mt-[55px]'> Engagé satisfaisamment envers vous et votre mission</h1>
        <h1 className='lg:text-[20px] text-[16px] text-center xl:px-[430px] px-0 text-gray3 mb-[90px]'>Prigra propose une multitude de fonctionnalités pour planifier et suiver des projets, depuis leur conception initiale jusqu'à leur présentation finale.</h1>
        <div className='flex flex-row flex-wrap items-start justify-center lg:px-[201px]  mb-[130px] '>
            {features.map((feature)=>(
                <div className='flex flex-col items-center justify-start w-[296px]  my-8 mx-9'>
                    <img src={feature.icon} alt={feature.id} className='mb-5' />
                    <h1 className='text-[20px] text-gray1 font-semibold mb-4'>{feature.title}</h1>
                    <p className='text-gray2 text-center'>{feature.content}</p>

                </div>
            ))}

        </div>

    </section>
  )
}

export default Features