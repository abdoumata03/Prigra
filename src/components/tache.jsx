import React, { useContext, useEffect, useState } from "react";
import {
  FiActivity,
  FiArrowLeft,
  FiCalendar,
  FiEdit3,
  FiFileText,
  FiPaperclip,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import ProfileContext from "../context/profile-context";
import { ImageConfig } from "../utils/image-config";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import ProjectContext from "../context/project-context";
import { Toaster, toast } from "react-hot-toast";
import WorkDoneInput from "./upload-work";

const Tache = ({ item }) => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isEncViewTaskDialogOpen, setisEncViewTaskDialogOpen] = useState(false);
  const [isEncEditTaskDialogOpen, setIsEncEditTaskDialogOpen] = useState(false);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const { userInitialData, projectData } = useContext(ProfileContext);
  const {
    deleteProjectTask,
    getProjectTasks,
    getProjectTask,
    putProjectTask,
    putWorkDone,
  } = useContext(ProjectContext);

  const task_statuses = [
    { label: "À faire", value: "À faire" },
    { label: "En cours", value: "En cours" },
    { label: "Complétée", value: "Complétée" },
  ];

  const onClickTask = () => {
    if (userInitialData?.type === "Student") {
      setIsTaskDialogOpen(true);
    } else {
      setisEncViewTaskDialogOpen(true);
    }
  };

  const onCancelDialog = () => {
    if (userInitialData?.type === "Student") {
      setIsTaskDialogOpen(false);
    } else {
      setisEncViewTaskDialogOpen(false);
    }
  };

  const onClickEdit = () => {
    setIsEncEditTaskDialogOpen(true);
  };

  const onCloseEdit = () => {
    setIsEncEditTaskDialogOpen(false);
  };

  const handleSubmitEditWorkDone = async (data) => {
    await toast.promise(putWorkDone(data, item.id), {
      loading: "En train de mettre à jour la tâche",
      success: "La tâche a été mis à jour",
      error: "Erreur lors la mise à jour du tâche",
    });
    setIsTaskDialogOpen(false);
  };

  const onClickDeleteTask = () => {
    setIsDeleteTaskDialogOpen(true);
  };

  const onCloseDeleteTask = () => {
    setIsDeleteTaskDialogOpen(false);
  };

  const onConfirmDeleteTask = async (task_id) => {
    await toast.promise(deleteProjectTask(projectData?.id, task_id), {
      loading: "En train de supprimer la tâche",
      success: "La tâche a été bien supprimé",
      error: "Erreur lors la supression de tâche",
    });
    setIsDeleteTaskDialogOpen(false);
    await getProjectTasks(projectData?.id);
  };

  const bytesToMB = (bytes) => {
    if (bytes < 1024) {
      return bytes + " bytes";
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes < 1073741824) {
      return (bytes / 1048576).toFixed(2) + " MB";
    } else {
      return (bytes / 1073741824).toFixed(2) + " GB";
    }
  };

  const isStudent = userInitialData?.type === "Student";
  const isTeacher = userInitialData?.type === "Teacher";

  const methods = useForm();

  const { register, handleSubmit, control, formState } = methods;

  const methods2 = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: formState2,
  } = methods2;

  const handleSubmitEditTask = async (data) => {
    await toast.promise(putProjectTask(data, item.id), {
      loading: "En train de modifier la tâche",
      success: "La tâche a été bien modifié",
      error: "Erreur lors la modification du tâche",
    });
    setIsEncEditTaskDialogOpen(false);
    await getProjectTasks(projectData?.id);
  };

  const isFormEdited = formState.isDirty;

  useEffect(() => {}, []);

  return (
    <>
      <div
        onClick={isStudent ? onClickTask : undefined}
        className={`bg-white_bg rounded-md py-3 px-4 mb-2 ${isStudent &&
          "cursor-pointer"}`}
      >
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base text-gray1 font-medium ">{item.title}</h2>
          {isTeacher && (
            <div className="flex items-center">
              <div
                onClick={onClickDeleteTask}
                className="text-error p-2 cursor-pointer"
              >
                <FiTrash2 />
              </div>
              <div
                onClick={onClickEdit}
                className="text-primary p-2 cursor-pointer"
              >
                <FiEdit3 />
              </div>
            </div>
          )}
        </div>
        <p className="text-sm text-gray2">{item.description}</p>
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <div
            onClick={onClickTask}
            className="flex gap-4 text-gray2 cursor-pointer"
          >
            {item.work_done && (
              <div className="relative">
                <FiActivity />

                <div className="h-1 w-1 bg-red-500 rounded-full absolute right-0 bottom-0" />
              </div>
            )}
            {item.files.length > 0 && (
              <div className="relative">
                <FiPaperclip />
                <div className="h-1 w-1 bg-red-500 rounded-full absolute right-0 bottom-0" />
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center text-gray2">
            <FiCalendar />
            <p className="text-xs font-medium text-gray2">{item.end_date}</p>
          </div>
        </div>
      </div>
      {/* Teacher: edit task */}
      {isEncEditTaskDialogOpen && (
        <div className="fixed inset-0 z-50 px-10 flex items-center justify-center bg-black bg-opacity-25">
          <form
            onSubmit={handleSubmit(handleSubmitEditTask)}
            className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center"
          >
            <div className="flex flex-col items-start py-4 px-10 w-full">
              <div className="flex items-center gap-3 mb-4 w-full">
                <h1 className="text-gray1 text-lg font-bold flex-1 ">
                  Modifier la tâche
                </h1>
                <div
                  onClick={onCloseEdit}
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
                  defaultValue={item.title}
                  className="bg-gray-100 text-sm border rounded-md h-10 w-full px-3"
                />
              </div>
              {/* DESCRIPTION */}
              <div className="w-full mb-2">
                <p className="text-xs text-gray2 mb-1">Description</p>
                <textarea
                  {...register("description")}
                  defaultValue={item.description}
                  className="bg-gray-100 pt-2 border text-sm resize-none rounded-md h-20 w-full px-3"
                />
              </div>
              {/* STATUS */}
              <div className="w-full mb-4">
                <p className="text-xs text-gray2 mb-1">Statut</p>
                <Controller
                  name="status"
                  render={({ field: { onChange } }) => (
                    <Select
                      options={task_statuses}
                      defaultValue={{ label: item.status, value: item.status }}
                      className="bg-gray-100 border text-sm rounded-md h-10 w-full"
                      onChange={(val) => {
                        onChange(val.value);
                      }}
                    />
                  )}
                  control={control}
                />
              </div>
              {/* DATE DEBUT ET FIN */}
              <div className="flex flex-col lg:flex-row w-full mb-2 gap-4">
                <div className="grow">
                  <p className="text-xs text-gray2 mb-1">Date dèbut</p>
                  <input
                    {...register("start_date")}
                    type="date"
                    defaultValue={item.start_date}
                    className="bg-gray-100 border text-sm text-gray1 rounded-md h-10 w-full px-3"
                  />
                </div>
                <div className="grow">
                  <p className="text-xs text-gray2 mb-1">Date fin</p>
                  <input
                    {...register("end_date")}
                    type="date"
                    defaultValue={item.end_date}
                    className="bg-gray-100 border text-sm text-gray1 rounded-md h-10 w-full px-3"
                  />
                </div>
              </div>
              {/* end edit fields */}
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-end gap-2 px-8 py-4 h-fit bg-gray-100 abolute rounded-b-lg">
              <button
                onClick={onCloseEdit}
                className="bg-white border text-sm font-medium py-2 px-4 text-gray1 rounded-md"
              >
                Annuler
              </button>
              <button className="bg-primary text-sm font-medium py-2 px-4 text-white rounded-md">
                Confirmer
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Teacher: Delete Task */}
      {isDeleteTaskDialogOpen && (
        <div className="fixed inset-0 px-10 z-50 flex items-center justify-center bg-black bg-opacity-25">
          <div className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center">
            <div className="flex flex-col items-start py-4 px-10 w-full">
              <div className="flex items-center gap-6 mb-4 w-full">
                <h1 className="text-gray1 text-lg font-bold flex-1 ">
                  Êtes-vous sûr de vouloir supprimer la tâche ?
                </h1>
                <div
                  onClick={onCloseDeleteTask}
                  className="text-gray3 cursor-pointer"
                >
                  <FiX />
                </div>
              </div>
              <p className="text-sm font-medium text-gray3 mb-2">
                La tâche "{item.title}" sera supprimé.
              </p>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-end gap-2 px-8 h-fit py-4 bg-gray-100 abolute rounded-b-lg">
              <button
                onClick={onCloseDeleteTask}
                className="bg-white border font-medium py-2 px-4 text-sm text-gray1 rounded-md"
              >
                Annuler
              </button>
              <button
                onClick={() => onConfirmDeleteTask(item.id)}
                type="button"
                className="bg-error flex items-center gap-2 font-medium py-2 px-4 text-white rounded-md text-sm"
              >
                <div>
                  <FiTrash2 />
                </div>
                <p>Confirmer</p>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Teacher: view work done */}
      {isEncViewTaskDialogOpen && (
        <div className="fixed inset-0 z-50 px-10 flex items-center justify-center bg-black bg-opacity-25">
          <div className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center">
            <div className="flex flex-col items-start py-4 px-10 w-full">
              <div className="flex items-center gap-3 mb-4 w-full">
                <h1 className="text-gray1 text-lg font-bold flex-1 ">
                  {item.title}
                </h1>
                <div
                  onClick={onCancelDialog}
                  className="text-gray3 cursor-pointer"
                >
                  <FiX />
                </div>
              </div>
              {item.work_done && (
                <div className="mb-2 border-b w-full border-dashed">
                  <div className="flex items-center gap-2 mb-2 text-gray2">
                    <FiFileText />
                    <p className=" text-sm font-medium">Travail réalisé</p>
                  </div>
                  <p className="text-sm text-gray2 mb-4">{item.work_done} </p>
                </div>
              )}
              <div className="w-full">
                {item?.files?.length > 0 && (
                  <div className="flex items-center gap-2 mb-2 text-gray2">
                    <FiPaperclip />
                    <p className=" text-sm font-medium">Fichiers attachés</p>
                  </div>
                )}
                {item?.files?.length > 0 &&
                  item?.files?.reverse().map((item, index) => (
                    <div
                      key={index}
                      className="bg-accent rounded-[0.4rem] px-6 py-3 mb-2 w-full flex flex-row justify-between items-center"
                    >
                      <div className="w-8 mr-3">{ImageConfig[item.format]}</div>
                      <div className="flex flex-col flex-1 overflow-hidden">
                        <a
                          href={item.url}
                          target="_blank"
                          className="font-medium text-sm text-gray1 mb-1 truncate"
                        >
                          {item.name}
                        </a>
                        <p className="font-regualar text-xs text-gray3">
                          {bytesToMB(item.size)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full flex items-center justify-end gap-2 px-8 h-16 bg-gray-100 rounded-b-lg">
              <button
                onClick={onCancelDialog}
                className="bg-white flex items-center gap-2 border font-medium py-2 px-4 text-gray1 text-sm rounded-md"
              >
                <div>
                  <FiArrowLeft />
                </div>
                <p>Retour</p>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Student: describe work done */}
      {isTaskDialogOpen && (
        <div className="fixed z-50 inset-0 px-10 flex items-center justify-center bg-black bg-opacity-25">
          <form
            onSubmit={handleSubmit2(handleSubmitEditWorkDone)}
            className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center"
          >
            <div className="flex flex-col items-start py-4 px-10 w-full">
              <div className="flex items-center gap-3 mb-4 w-full">
                <h1 className="text-gray1 text-lg font-bold flex-1 ">
                  {item.title}
                </h1>
                <div
                  onClick={onCancelDialog}
                  className="text-gray3 cursor-pointer"
                >
                  <FiX />
                </div>
              </div>
              <p className="text-sm font-medium text-gray3 mb-2">
                Ajoutez un descriptif de travail réalisé
              </p>
              <textarea
                {...register2("work_done")}
                name="work_done"
                defaultValue={item.workDone}
                className={`h-16 resize-none w-full border rounded-md py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6`}
                placeholder="Describez votre avancement dans cette tâche..."
              />
              <WorkDoneInput task_id={item.id} />
            </div>
            <div className="w-full flex items-center justify-end gap-2 px-8 h-16 bg-gray-100 abolute rounded-b-lg">
              <button
                onClick={onCancelDialog}
                type="button"
                className="bg-white border text-sm font-medium py-2 px-4 text-gray1 rounded-md"
              >
                Annuler
              </button>
              <button className="bg-primary text-sm font-medium py-2 px-4 text-white rounded-md">
                Confirmer
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Tache;
