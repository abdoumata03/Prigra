import React, { useContext } from "react";
import Breadcrumbs from "./breadcrumbs";
import { Controller, useForm } from "react-hook-form";
import { IconContext } from "react-icons";
import {
  FiAward,
  FiCheckCircle,
  FiInfo,
  FiMail,
  FiPercent,
  FiSend,
  FiStar,
} from "react-icons/fi";
import ProjectContext from "../context/project-context";
import ProfileContext from "../context/profile-context";
import PersonField from "./person-filed";
import Select from "react-select";

const Jury = () => {
  const methods = useForm();
  const {
    register,
    control,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const { projectData } = useContext(ProfileContext);

  const formattedMembers = projectData?.members.map((member) => ({
    label: member.full_name,
    value: member.email,
  }));

  const submitDelibiration = (data) => {
    console.log(data);
  };

  console.log(Date.parse(projectData.soutenance?.date_soutenance));
  console.log(Date.now());

  return (
    <>
      <Breadcrumbs />
      {Date.parse(projectData.soutenance?.date_soutenance) <= Date.now() ? (
        <div className="flex gap-16">
          <form
            onSubmit={handleSubmit(submitDelibiration)}
            className="w-2/5 flex flex-col gap-2"
          >
            <p className="text-[13px] font-medium text-gray3">
              Membre de l'équipe
            </p>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 h-12 left-0 flex items-center pl-3 pointer-events-none">
                <IconContext.Provider
                  value={{ className: "text-primary opacity-50" }}
                >
                  <FiMail />
                </IconContext.Provider>
              </div>
              <Controller
                name={"email"}
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    options={formattedMembers}
                    className="bg-white border shadow-custom text-sm text-gray1 rounded-md h-10 w-full"
                    onChange={(val) => {
                      onChange(val.value);
                    }}
                  />
                )}
              />
            </div>
            <p className="text-[13px] font-medium text-gray3">Note</p>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 h-12 left-0 flex items-center pl-3 pointer-events-none">
                <IconContext.Provider
                  value={{ className: "text-primary opacity-50" }}
                >
                  <FiPercent />
                </IconContext.Provider>
              </div>
              <input
                {...register("note")}
                name="note"
                type="number"
                min={"0"}
                max={"20"}
                step={"0.25"}
                placeholder="Note"
                className="bg-white pl-10 border shadow-custom text-sm text-gray1 rounded-md h-12 w-full px-3"
              />
            </div>
            <p className="text-[13px] font-medium text-gray3">Mention</p>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 h-12 left-0 flex items-center pl-3 pointer-events-none">
                <IconContext.Provider
                  value={{ className: "text-primary opacity-50" }}
                >
                  <FiAward />
                </IconContext.Provider>
              </div>
              <input
                {...register("mention")}
                name="mention"
                placeholder="ex. Trés Bien"
                className="bg-white pl-10 border shadow-custom text-sm text-gray1 rounded-md h-12 w-full px-3"
              />
            </div>
            <p className="text-[13px] font-medium text-gray3">Appréciation</p>
            <div className="relative flex-1">
              <div className="absolute inset-y-0 h-12 left-0 flex items-center pl-3 pointer-events-none">
                <IconContext.Provider
                  value={{ className: "text-primary opacity-50" }}
                >
                  <FiCheckCircle />
                </IconContext.Provider>
              </div>
              <input
                {...register("appréciation")}
                name="appréciation"
                placeholder="ex. Appréciation"
                className="bg-white pl-10 border shadow-custom text-sm text-gray1 rounded-md h-12 w-full px-3"
              />
            </div>

            <button className="h-12 mt-6 flex items-center justify-center gap-2 text-sm font-medium text-white px-4 rounded-[0.4rem] bg-primary">
              <div>
                <FiSend />
              </div>
              Délibirer
            </button>
          </form>
          <div className="bg-white rounded-[0.4rem] w-3/5 shadow-custom flex flex-col justify-center h-fit py-6 px-8 border mb-3 ">
            <h1 className="text-lg font-bold text-gray1 mb-3">
              Intitulé du projet
            </h1>
            <p className="text-base text-gray1">
              {projectData?.nom_scientifique}
            </p>
            <hr className="mb-4 mt-4" />
            <h1 className="text-lg font-bold text-gray1 mb-3">
              Membres de l'équipe
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2 ">
                <p className="text-[13px] font-medium text-gray3 ">
                  Porteur de projet
                </p>
                <div className="h-[1px] flex-grow bg-gray-200" />
              </div>
              <PersonField
                name={projectData?.owner.full_name}
                email={projectData?.owner.email}
              />
              <div className="flex items-center gap-3 mb-2 ">
                <p className="text-[13px] font-medium text-gray3 ">
                  Membres de l'équipe
                </p>
                <div className="h-[1px] flex-grow bg-gray-200" />
              </div>
              {projectData.members?.map((member, index) => (
                <PersonField name={member.full_name} email={member.email} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-accent border px-8 py-6 rounded-[0.4rem] w-1/2">
          <div className="flex w-full gap-3">
            <div className="text-error mt-1">
              <FiInfo />
            </div>
            <div>
              <p className="text-gray2 text-sm">
                Vous ne pouvez pas délibirer avant la soutenance
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Jury;
