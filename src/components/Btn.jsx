import React from 'react'

const Btn = (props) => {
  return (
    <button className='bg-primary lg:w-[275px] w-[180px] lg:h-[66px] h-[43px] text-white lg:text-[20px] text-[13px] font-bold rounded-[8px] '>
        {props.name}
    </button>
  )
}
export default Btn