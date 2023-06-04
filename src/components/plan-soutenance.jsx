import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import { FiSave, FiSend } from "react-icons/fi";
import InviteJury from "./jury-invitation";

const PlanSoutenance = () => {
  const methods = useForm();
  const methods_jury = useForm();

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

  const {
    register: register_jury,
    handleSubmit: handleSubmitJury,
    control: control_jury,
    formState: { errors: errors_jury },
  } = methods_jury;

  const addJury = (data) => {
    console.log(data);
  };

  const submitSoutenanceInfo = (data) => {
    console.log(data);
  };

  return (
    <div className="flex gap-16">
      <form
        onSubmit={handleSubmit(submitSoutenanceInfo)}
        className="w-1/2 flex flex-col gap-3"
      >
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
      </form>
      <div className="w-1/2 flex flex-col gap-3">
        <h1 className="text-gray1 font-bold mb-3">Membres de jury</h1>
        <FormProvider {...methods_jury}>
          <form
            onSubmit={handleSubmitJury(addJury)}
            className="flex flex-col items-end gap-2"
          >
            <div className="w-full">
              <InviteJury
                mail_name={"jury_mail"}
                type_name={"jury_type"}
                optional={false}
              />
            </div>
            <button className="h-[40px] flex items-center justify-center gap-2 text-sm font-medium text-white px-4 rounded-[0.4rem] bg-primary">
              <div
              //   className={`${isInvitationLoading && `animate-wiggle`}`}
              >
                <FiSend />
              </div>
              Ajouter
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default PlanSoutenance;
