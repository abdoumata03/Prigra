import React from 'react'
import { footerItems, socialMedia } from '../constants'
import { logo } from '../assets'

const Footer = () => {
  return (
    <section
    id='section-footer'
    className=' lg:text-[16px] text-[12px] lg:px-[140px] px-12 bg-accent flex flex-col lg:pt-[104px] pt-[50px] pb-[41px]'>
        <div className='flex justify-between md:flex-row flex-col items-start'>
            <img src={logo} alt="logo" className='w-[136px] h-[48px] mr-[60px] mb-4' />
            <div className='w-full flex justify-between flex-wrap'>
                {footerItems.map((footerItem)=>(
                    <div >
                        <h4 className='font-semibold text-gray2 mb-[22px]'>{footerItem.title}


                        </h4>
                        <ul className='list-none'>
                            {footerItem.links.map((link, index)=>(
                                <li
                                key={link.name} 
                                className={`text-gray3 cursor-pointer mb-3`}>
                                    {link.name}

                                </li>
                            ))}

                        </ul>

                    </div>

                ))}
            </div>
        </div>

        <div className='w-full flex justify-between items-center md:flex-row flex-col border-t-[2px] border-t-gray5 lg:mt-[130px] mt-[50px] pt-5'>
            <p className='text-gray3 mb-3'>© 2023 | tous droits réservés</p>
            <div className='flex flex-row'>
                {socialMedia.map((social, index)=>(
                    <img 
                    key={social.id} 
                    src={social.link} 
                    alt={social.id} 
                    className={`w-[25px] h-[25px] object-contain cursor-pointer ${index=! socialMedia.length-1 ? 'mr-6' : 'mr-0'}`}
                    onClick={()=> window.open(social.link)}/>


                ))}

            </div>


        </div>

    </section>
  )
}

export default Footer