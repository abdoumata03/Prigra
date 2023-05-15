import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactComponent as Save } from "../assets/icons/save.svg";

const shema = yup.object().shape({
  debut_phase1:yup
  .date(),
  fin_phase1:yup
  .date(),
  debut_phase2:yup
  .date(),
  fin_phase2:yup
  .date(),
  debut_phase3:yup
  .date(),
  fin_phase3:yup
  .date(),
  debut_phase4:yup
  .date(),
  fin_phase4:yup
  .date(),
});

const DatePlanification = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shema),
  });

  const submitForm = (data) => {
 
  };

  return (
      <div className="w-5/6 mt-[50px] flex flex-col">
        <div className="w-3/6">
          <h1 className=' text-xl font-bold text-gray1'>Planificaiton des phases des projets</h1>
          <h2 className='text-sm font-normal text-gray3 mb-6'>Optimisez l'organisation et la progression des projets grâce à une planification précise des phases</h2>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col w-full">

              <h1 className='text-gray2 font-medium text-[18px] mt-10 mb-5'>Phase 1</h1>
              <div className='flex flex-row gap-10'>
                  <div className='w-full items-start justify-start'>
                    <p className="text-[13px] font-medium text-gray3 mb-1">Début</p>
                    <input
                    {...register("debut-phase1")}
                    type="date"
                    name="debut-phase1"
                    required
                    className="text-[16px] rounded-[5px] bg-white w-full h-[50px] pl-[24px] text-gray3 outline-none pr-5"
                    />
                  </div>
                  <div className='w-full'>
                    <p className="text-[13px] font-medium text-gray3 mb-1">Fin</p>
                    <input
                    {...register("fin-phase1")}
                    type="date"
                    name="fin-phase1"
                    required
                    className="text-[16px] rounded-[5px] bg-white w-full h-[50px] pl-[24px] text-gray3 outline-none pr-5"
                    />
                  </div>
              </div>

              <h1 className='text-gray2 font-medium text-[18px] mt-10  mb-5'>Phase 2</h1>
              <div className='flex flex-row gap-10'>
                <div className='w-full'>
                  <p className="text-[13px] font-medium text-gray3 mb-1">Début</p>
                  <input
                  {...register("debut-phase2")}
                  type="date"
                  name="debut-phase2"
                  required
                  className="text-[16px] rounded-[5px] bg-white w-full h-[50px] pl-[24px] text-gray3 outline-none pr-5"
                  />
                  </div>
                  <div className='w-full'>
                    <p className="text-[13px] font-medium text-gray3 mb-1">Fin</p>
                    <input
                    {...register("fin-phase2")}
                    type="date"
                    name="fin-phase2"
                    required
                    className="text-[16px] rounded-[5px] bg-white w-full h-[50px] pl-[24px] text-gray3 outline-none pr-5"
                    />
                  </div>
              </div>
              <h1 className='text-gray2 font-medium text-[18px] mt-10 mb-5'>Phase 3</h1>
              <div className='flex flex-row gap-10'>
                <div className='w-full'>
                  <p className="text-[13px] font-medium text-gray3 mb-1">Début</p>
                  <input
                  {...register("debut-phase1")}
                  type="date"
                  name="debut-phase3"
                  required
                  className="text-[16px] rounded-[5px] bg-white w-full h-[50px] pl-[24px] text-gray3 outline-none pr-5"
                  />
                  </div>
                  <div className='w-full'>
                    <p className="text-[13px] font-medium text-gray3 mb-1">Fin</p>
                    <input
                    {...register("fin-phase1")}
                    type="date"
                    name="fin-phase3"
                    required
                    className="text-[16px] rounded-[5px] bg-white w-full h-[50px] pl-[24px] text-gray3 outline-none pr-5"
                    />
                  </div>
              </div>
              <h1 className='text-gray2 font-medium text-[18px] mt-10  mb-5'>Phase 4</h1>
              <div className='flex flex-row gap-10'>
                <div className='w-full'>
                  <p className="text-[13px] font-medium text-gray3 mb-1">Début</p>
                  <input
                  {...register("debut-phase1")}
                  type="date"
                  name="debut-phase4"
                  required
                  className="text-[16px] rounded-[5px] bg-white w-full h-[50px] pl-[24px] text-gray3 outline-none pr-5"
                  />
                  </div>
                  <div className='w-full'>
                    <p className="text-[13px] font-medium text-gray3 mb-1">Fin</p>
                    <input
                    {...register("fin-phase1")}
                    type="date"
                    name="fin-phase4"
                    required
                    className="text-[16px] rounded-[5px] bg-white w-full h-[50px] pl-[24px] text-gray3 outline-none pr-5"
                    />
                  </div>
              </div>

              <button className=" absolute bottom-20 right-40 flex justify-center items-center gap-3 self-end h-[40px] md:h-[50px] bg-primary text-white text-sm md:text-md font-semibold rounded-[5px] px-5 mb-10 lg:mb-0 mt-10 w-full md:w-auto">
              <Save />
              Sauvegarder
            </button>
              
            </form>
        </div>
      </div>
  )
}

export default DatePlanification