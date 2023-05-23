import React, { useContext, useState } from "react";
import Column from "./column";
import ProjectContext from "../context/project-context";
import ProfileContext from "../context/profile-context";
import { FiPlus, FiX } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { Toaster, toast } from "react-hot-toast";

const schema = yup.object().shape({
  title: yup.string().required("Veuillez ajouter un titre"),
  description: yup.string().required("Veuillez ajouter une description"),
  status: yup.string().required("Veullier spécifier le statut de la tâche"),
  start_date: yup
    .date("Veuillez spécifier une date début")
    .required("Veuillez spécifier une date début")
    .typeError("Veulliez spécifier une date valide"),
  end_date: yup
    .date("Veuillez spécifier une date fin")
    .required("Veuillez spécifier une date fin")
    .typeError("Veulliez spécifier une date valide"),
});

const Tasks = () => {
  const { tasksData, addProjectTask, getProjectTasks } = useContext(
    ProjectContext
  );
  const { userInitialData, projectData } = useContext(ProfileContext);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);

  const task_statuses = [
    { label: "À faire", value: "À faire" },
    { label: "En cours", value: "En cours" },
    { label: "Complétée", value: "Complétée" },
  ];

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const handleAddTask = () => {
    setIsAddTaskDialogOpen(true);
  };

  const onCloseAddTask = () => {
    setIsAddTaskDialogOpen(false);
  };

  const handleAddTaskSubmit = async (data) => {
    await toast.promise(addProjectTask(projectData?.id, data), {
      loading: "En train d'ajouter la tâche",
      success: "La tâche a été bien ajouté",
      error: "Erreur lors l'ajout de la tâche",
    });
    setIsAddTaskDialogOpen(false);
    reset();
    await getProjectTasks(projectData?.id);
  };

  const isTeacher = userInitialData?.type === "Teacher";

  return (
    <div className="flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      {isTeacher && (
        <div
          onClick={handleAddTask}
          className="flex items-center text-white cursor-pointer gap-2 bg-primary rounded-md w-fit px-3 py-3 mb-7"
        >
          <FiPlus />
          <p className="text-sm font-medium">Ajouter une tâche</p>
        </div>
      )}
      <div className="flex gap-4 flex-wrap">
        <Column titre={"À faire"} type={"À faire"} data={tasksData} />
        <Column titre={"En cours"} type={"En cours"} data={tasksData} />
        <Column titre={"Complétées"} type={"Complétée"} data={tasksData} />
      </div>
      {isAddTaskDialogOpen && (
        <div className="fixed inset-0 px-10 flex items-center justify-center bg-black bg-opacity-25">
          <form
            onSubmit={handleSubmit(handleAddTaskSubmit)}
            className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center"
          >
            <div className="flex flex-col items-start py-4 px-10 w-full">
              <div className="flex items-center gap-3 mb-4 w-full">
                <h1 className="text-gray1 text-lg font-bold flex-1 ">
                  Ajouter une tâche
                </h1>
                <div
                  onClick={onCloseAddTask}
                  className="text-gray3 cursor-pointer"
                >
                  <FiX />
                </div>
              </div>
              {/* edit fields */}

              {/* NAME */}
              <div className="w-full mb-2">
                <p className="text-xs text-gray2 mb-1">Nom du tâche</p>
                <input
                  {...register("title")}
                  className="bg-gray-100 text-sm border rounded-md h-10 w-full px-3"
                />
                <p className="text-error text-xs mt-1">
                  {errors.title && errors.title.message}
                </p>
              </div>
              {/* DESCRIPTION */}
              <div className="w-full mb-2">
                <p className="text-xs text-gray2 mb-1">Description</p>
                <textarea
                  {...register("description")}
                  className="bg-gray-100 pt-2 border text-sm resize-none rounded-md h-20 w-full px-3"
                />
                <p className="text-error text-xs ">
                  {errors.description && errors.description.message}
                </p>
              </div>
              {/* STATUS */}
              <div className="w-full mb-4">
                <p className="text-xs text-gray2 mb-1">Statut</p>
                <Controller
                  name="status"
                  render={({ field: { onChange } }) => (
                    <Select
                      options={task_statuses}
                      className="bg-gray-100 border text-sm rounded-md h-10 w-full"
                      onChange={(val) => {
                        onChange(val.value);
                      }}
                    />
                  )}
                  control={control}
                />

                <p className="text-error text-xs mt-1">
                  {errors.status && errors.status.message}
                </p>
              </div>
              {/* DATE DEBUT ET FIN */}
              <div className="flex flex-col lg:flex-row w-full mb-2 gap-4">
                <div className="grow">
                  <p className="text-xs text-gray2 mb-1">Date dèbut</p>
                  <input
                    {...register("start_date")}
                    type="date"
                    className="bg-gray-100 border text-sm text-gray1 rounded-md h-10 w-full px-3"
                  />
                  <p className="text-error text-xs mt-1">
                    {errors.start_date && errors.start_date.message}
                  </p>
                </div>
                <div className="grow">
                  <p className="text-xs text-gray2 mb-1">Date fin</p>
                  <input
                    {...register("end_date")}
                    type="date"
                    className="bg-gray-100 border text-sm text-gray1 rounded-md h-10 w-full px-3"
                  />
                  <p className="text-error text-xs mt-1">
                    {errors.end_date && errors.end_date.message}
                  </p>
                </div>
              </div>
              {/* end edit fields */}
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-end gap-2 px-8 py-4 h-fit bg-gray-100 abolute rounded-b-lg">
              <button
                onClick={onCloseAddTask}
                type="button"
                className="bg-white border font-medium py-2 px-4 text-gray1 rounded-md"
              >
                Annuler
              </button>
              <button className="bg-primary font-medium py-2 px-4 text-white rounded-md">
                Ajouter
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tasks;
