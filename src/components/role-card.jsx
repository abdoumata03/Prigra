import { useState } from "react"



const RoleCard = ({icon, title, description}) => {
  const [clicked, setClicked] = useState(false);

  
  const handleClick = () => {
    setClicked(true);
  };

  
  return (

<div 
onClick={handleClick}
className={`w-[245px] h-[274px] px-6 py-8 flex flex-col justify-center bg-white border rounded-md shadow-custom border-gray-200 hover:bg-accent hover:border-accent hover:shadow-none hover:cursor-pointer ${ clicked ? '':  'bg-accent border-accent shadow-none' }`}>
    <div className=' self-center w-[140px] h-[92px]'>{icon}</div>
    <div className='mt-12 flex-col items-start'>
    <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-800">{title}</h5>
    <p className="text-gray-400 text-xs dark:text-gray-500">{description}</p>
    </div>
</div>
  )
}

export default RoleCard