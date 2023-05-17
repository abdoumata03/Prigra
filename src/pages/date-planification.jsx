import React, {useEffect, useContext} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactComponent as Save } from "../assets/icons/save.svg";
import PhaseContext from '../context/phase-context';
import { format } from "date-fns";
import BlueLoadingSpinner from "../components/spinner_blue";

const schema = yup.object().shape({
  debut_phase1: yup.date(),
  fin_phase1: yup
    .date()
    .test('fin_phase1', 'Fin de phase doit être postérieure au début de phase.', function (value) {
      const debutPhase1 = this.resolve(yup.ref('debut_phase1'));
      return value > debutPhase1;
    }),
  debut_phase2: yup
    .date()
    .test('debut_phase2', 'La deuxième phase débute après la fin de la précédente.', function (value) {
      const finPhase1 = this.resolve(yup.ref('fin_phase1'));
      return value >= finPhase1;
    }),
  fin_phase2: yup
    .date()
    .test('fin_phase2', 'Fin de phase doit être postérieure au début de phase.', function (value) {
      const debutPhase2 = this.resolve(yup.ref('debut_phase2'));
      return value > debutPhase2;
    }),
  debut_phase3: yup
    .date()
    .test('debut_phase3', 'La troisième phase débute après la fin de la précédente.', function (value) {
      const finPhase2 = this.resolve(yup.ref('fin_phase2'));
      return value >= finPhase2;
    }),
  fin_phase3: yup
    .date()
    .test('fin_phase3', 'Fin de phase doit être postérieure au début de phase.', function (value) {
      const debutPhase3 = this.resolve(yup.ref('debut_phase3'));
      return value > debutPhase3;
    }),
    debut_phase4: yup
    .date()
    .test('debut_phase4', 'La dernière phase débute après la fin de la précédente.', function (value) {
      const finPhase3 = this.resolve(yup.ref('fin_phase3'));
      return value >= finPhase3;
    }),
  fin_phase4: yup
    .date()
    .test('fin_phase4', 'Fin de phase doit être postérieure au début de phase.', function (value) {
      const debutPhase4 = this.resolve(yup.ref('debut_phase4'));
      return value > debutPhase4;
    }),
});


const DatePlanification = () => {
const {phases, putPhase, fetch_phases, isPhasesLoading} = useContext(PhaseContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, 
  } = useForm({
    resolver: yupResolver(schema),
  });
   
  const submitForm = (data) => {
    phases.forEach((index) => {
      const debutKey = `debut_phase${index + 1}`;
      const finKey = `fin_phase${index + 1}`;
      const debutDate = format(data[debutKey], "yyyy-MM-dd");
      const finDate = format(data[finKey], "yyyy-MM-dd");
      putPhase(index + 1, debutDate, finDate);
    });
  };

  const handleFinPhaseChange = (phaseNumber, event) => {
    const finPhaseValue = event.target.value;
    setValue(`debut_phase${phaseNumber}`, finPhaseValue);
  };

  useEffect(() => {
    fetch_phases();
    console.log(phases);
    phases?.map((phase, index) => {
      setValue(`debut_phase${index}`, phase.date_debut);
      setValue(`fin_phase${index}`, phase.date_fin);
    });
  }, []);

  if (isPhasesLoading) {
    return (
      <div className="flex flex-row gap-3 h-full justify-center items-center">
        <BlueLoadingSpinner />
        <p className="text-md text-gray3">
          Nous préparons vos données, merci de patienter...
        </p>
      </div>
    );
  } else {
  return (
  <div className="w-5/6 mt-10 flex flex-col">
    <div className="w-4/6">
      <h1 className="text-xl font-bold text-gray-800">Planification Des Phases Des Projets</h1>
      <h2 className="text-sm font-normal text-gray3 mb-6">Optimisez l'organisation et la progression des projets grâce à une planification précise des phases</h2>
      <form onSubmit={handleSubmit(submitForm)} className="flex flex-col w-full">

        <h1 className="text-gray-700 font-medium text-lg mt-10 mb-5">Période de soumission des projets</h1>
        <div className="flex flex-row gap-10">
          <div className="w-1/2">
            <p className="text-xs font-medium text-gray3 mb-1">Début</p>
            <input
              {...register("debut_phase1")}
              type="date"
              name="debut_phase1"
              required
              className="text-base rounded-md bg-white w-full h-10 pl-4 text-gray3 outline-none"
            />
          </div>
          <div className="w-1/2">
            <p className="text-xs font-medium text-gray3 mb-1">Fin</p>
            <input
              {...register("fin_phase1")}
              type="date"
              name="fin_phase1"
              required
              className="text-base rounded-md bg-white w-full h-10 pl-4 text-gray3 outline-none"
              onChange={(event) => handleFinPhaseChange(2, event)}
            />
            {errors.fin_phase1 && <p className="text-red-500 text-sm ml-2">{errors.fin_phase1.message}</p>}
          </div>
        </div>

        <h1 className="text-gray-700 font-medium text-lg mt-10 mb-5">Période de validation des projets</h1>
        <div className="flex flex-row gap-10">
          <div className="w-1/2">
            <p className="text-xs font-medium text-gray3 mb-1">Début</p>
            <input
              {...register("debut_phase2")}
              type="date"
              name="debut_phase2"
              required
              className="text-base rounded-md bg-white w-full h-10 pl-4 text-gray3 outline-none"
            />
            {errors.debut_phase2 && <p className="text-red-500 text-sm ml-2">{errors.debut_phase2.message}</p>}
          </div>
          <div className="w-1/2">
            <p className="text-xs font-medium text-gray3 mb-1">Fin</p>
            <input
              {...register("fin_phase2")}
              type="date"
              name="fin_phase2"
              required
              className="text-base rounded-md bg-white w-full h-10 pl-4 text-gray3 outline-none"
              onChange={(event) => handleFinPhaseChange(3, event)}
            />
            {errors.fin_phase2 && <p className="text-red-500 text-sm ml-2">{errors.fin_phase2.message}</p>}
          </div>
        </div>

        <h1 className="text-gray-700 font-medium text-lg mt-10 mb-5">Période de dépôt de recours</h1>
        <div className="flex flex-row gap-10">
          <div className="w-1/2">
            <p className="            text-xs font-medium text-gray3 mb-1">Début</p>
            <input
              {...register("debut_phase3")}
              type="date"
              name="debut_phase3"
              required
              className="text-base rounded-md bg-white w-full h-10 pl-4 text-gray3 outline-none"
            />
            {errors.debut_phase3 && <p className="text-red-500 text-sm ml-2">{errors.debut_phase3.message}</p>}
          </div>
          <div className="w-1/2">
            <p className="text-xs font-medium text-gray3 mb-1">Fin</p>
            <input
              {...register("fin_phase3")}
              type="date"
              name="fin_phase3"
              required
              className="text-base rounded-md bg-white w-full h-10 pl-4 text-gray3 outline-none"
              onChange={(event) => handleFinPhaseChange(4, event)}
            />
            {errors.fin_phase3 && <p className="text-red-500 text-sm ml-2">{errors.fin_phase3.message}</p>}
          </div>
        </div>

        <h1 className="text-gray-700 font-medium text-lg mt-10 mb-5">Période de validation des projets après recours</h1>
        <div className="flex flex-row gap-10">
          <div className="w-1/2">
            <p className="text-xs font-medium text-gray3 mb-1">Début</p>
            <input
              {...register("debut_phase4")}
              type="date"
              name="debut_phase4"
              required
              className="text-base rounded-md bg-white w-full h-10 pl-4 text-gray3 outline-none"
            />
            {errors.debut_phase4 && <p className="text-red-500 text-sm ml-2">{errors.debut_phase4.message}</p>}
          </div>
          <div className="w-1/2">
            <p className="text-xs font-medium text-gray3 mb-1">Fin</p>
            <input
              {...register("fin_phase4")}
              type="date"
              name="fin_phase4"
              required
              className="text-base rounded-md bg-white w-full h-10 pl-4 text-gray3 outline-none"
            />
            {errors.fin_phase4 && <p className="text-red-500 text-sm ml-2">{errors.fin_phase4?.message}</p>}
          </div>
        </div>

        <button className="flex justify-center items-center gap-3 self-end h-[40px] md:h-[50px] bg-primary text-white text-sm md:text-md font-semibold rounded-[5px] px-5 mb-10 lg:mb-0 mt-10 w-full md:w-auto">
                <Save />
                Sauvegarder
        </button>

      </form>
    </div>
  </div>
);
  }
}

export default DatePlanification