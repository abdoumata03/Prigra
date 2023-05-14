import React from 'react'

const ProjectInfoField = (props) => {
  return (
    <div 
    className=' px-4 py-3 bg-white mb-3 w-auto rounded-[5px] border'>
    <h1 className='text-[14px] text-gray3 mb-2 ' >{props.title}</h1>
    <p className='font-medium'>{props.content}</p>
    </div>
  )
}

export default ProjectInfoField