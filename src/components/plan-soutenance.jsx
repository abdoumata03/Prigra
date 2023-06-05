import React, { useContext } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import { FiMail, FiSave, FiSend } from "react-icons/fi";
import InviteJury from "./jury-invitation";
import { IconContext } from "react-icons";
import ProjectContext from "../context/project-context";
import { useLocation } from "react-router";

const PlanSoutenance = () => {
  const methods = useForm();

  const { createProjectSoutenance } = useContext(ProjectContext);

  const natureOptions = [
    {
      label: "Ouverte",
      value: "ouverte",
    },
    {
      label: "À huis clos",
      value: "à huis clos",
    },
  ];

  const modeOptions = [
    {
      label: "Présentiel",
      value: "présentiel",
    },
    {
      label: "À distance",
      value: "à distance",
    },
  ];

  const {
    register,
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const location = useLocation();
  const paths = location.pathname.split("/");
  const pid = paths[paths.length - 1];


  const submitSoutenanceInfo = async (data) => {
    await createProjectSoutenance(parseInt(pid), data);
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(submitSoutenanceInfo)}
        className="w-full flex gap-16"
      >
        <div className="flex flex-col gap-2 w-1/2">
          <h1 className="text-gray1 font-bold mb-3">Détails du soutenance</h1>
          <div>
            <p className="text-xs text-gray2 mb-1">Date </p>
            <input
              {...register("date")}
              name="date"
              type="date"
              className="bg-white border shadow-custom text-sm text-gray1 rounded-md h-10 w-full px-3"
            />
          </div>
          <div>
            <p className="text-xs text-gray2 mb-1">Heure </p>
            <input
              {...register("heure")}
              name="heure"
              type="time"
              step="3600"
              min="00:00"
              max="23:59"
              pattern="[0-2][0-9]:[0-5][0-9]"
              className="bg-white border shadow-custom text-sm text-gray1 rounded-md h-10 w-full px-3"
            />
          </div>
          <div>
            <p className="text-xs text-gray2 mb-1">Lieu</p>
            <input
              {...register("lieu")}
              name="lieu"
              className="bg-white border shadow-custom text-sm text-gray1 rounded-md h-10 w-full px-3"
            />
          </div>
          <div>
            <p className="text-xs text-gray2 mb-1">Mode</p>
            <Controller
              name={"mode"}
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  className="bg-white border shadow-custom text-sm text-gray1 rounded-md h-10 w-full"
                  options={modeOptions}
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                />
              )}
            />
          </div>
          <div>
            <p className="text-xs text-gray2 mb-1">Nature</p>
            <Controller
              name={"nature"}
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  options={natureOptions}
                  className="bg-white border shadow-custom text-sm text-gray1 rounded-md h-10 w-full"
                  onChange={(val) => {
                    onChange(val.value);
                  }}
                />
              )}
            />
          </div>
          <button className="h-[40px] mt-6 flex items-center justify-center gap-2 text-sm font-medium text-white px-4 rounded-[0.4rem] bg-primary">
            <div
            //   className={`${isInvitationLoading && `animate-wiggle`}`}
            >
              <FiSave />
            </div>
            Sauvegarder
          </button>
        </div>

        <div className="w-1/2 flex flex-col gap-3">
          <h1 className="text-gray1 font-bold mb-3">Membres de jury</h1>
          <div className="flex flex-col items-end gap-2">
            <div className="w-full mb-4">
              <p className="text-xs text-gray2 mb-1">Président</p>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <IconContext.Provider
                    value={{ className: "text-primary opacity-50" }}
                  >
                    <FiMail />
                  </IconContext.Provider>
                </div>
                <input
                  {...register("président")}
                  name="président"
                  placeholder="Adresse email"
                  className="bg-white pl-10 border shadow-custom text-sm text-gray1 rounded-md h-10 w-full px-3"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-xs text-gray2 mb-2">Membres du Jury</p>
              <div className="flex flex-col gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IconContext.Provider
                      value={{ className: "text-primary opacity-50" }}
                    >
                      <FiMail />
                    </IconContext.Provider>
                  </div>
                  <input
                    {...register("jury_1")}
                    name="jury_1"
                    placeholder="Adresse email"
                    className="bg-white pl-10 border shadow-custom text-sm text-gray1 rounded-md h-10 w-full px-3"
                  />
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IconContext.Provider
                      value={{ className: "text-primary opacity-50" }}
                    >
                      <FiMail />
                    </IconContext.Provider>
                  </div>
                  <input
                    {...register("jury_2")}
                    name="jury_2"
                    placeholder="Adresse email"
                    className="bg-white pl-10 border shadow-custom text-sm text-gray1 rounded-md h-10 w-full px-3"
                  />
                </div>
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IconContext.Provider
                      value={{ className: "text-primary opacity-50" }}
                    >
                      <FiMail />
                    </IconContext.Provider>
                  </div>
                  <input
                    {...register("jury_3")}
                    name="jury_3"
                    placeholder="Adresse email"
                    className="bg-white pl-10 border shadow-custom text-sm text-gray1 rounded-md h-10 w-full px-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlanSoutenance;
