import React, { useState } from "react";
import {
  FiActivity,
  FiCalendar,
  FiDribbble,
  FiFile,
  FiPaperclip,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import FileInput from "./file_input";

const Tache = ({ item }) => {
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  const onClickTask = () => {
    setIsTaskDialogOpen(true);
  };

  const onCancelDialog = () => {
    setIsTaskDialogOpen(false);
  };

  return (
    <>
      <div
        onClick={onClickTask}
        className={`bg-white_bg rounded-md py-3 px-4 mb-2 cursor-pointer`}
      >
        <h2 className="text-base text-gray1 font-medium mb-2">{item.title}</h2>
        <p className="text-sm text-gray2">{item.description}</p>
        <hr className="my-4" />
        <div className="flex items-center">
          <div className="flex gap-2 flex-1 text-gray2">
            {item.workDone && <FiActivity />}
            {item.files && <FiPaperclip />}
          </div>
          <div className="flex gap-2 items-center text-gray2">
            <FiCalendar />
            <p className="text-xs font-medium text-gray2">{item.endDate}</p>
          </div>
        </div>
      </div>
      {isTaskDialogOpen && (
        <div className="fixed inset-0 px-10 flex items-center justify-center bg-black bg-opacity-25">
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
              <p className="text-sm font-medium text-gray3 mb-2">
                Ajoutez un descriptif de travail réalisé
              </p>
              <textarea
                name="descriptif"
                defaultValue={item.workDone}
                className={`h-16 resize-none w-full border rounded-md py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6`}
                placeholder="Describez votre avancement dans cette tâche..."
              />
              <FileInput />
            </div>
            <div className="w-full flex items-center justify-end gap-2 px-8 h-16 bg-gray-100 abolute rounded-b-lg">
              <button
                onClick={onCancelDialog}
                className="bg-white border font-medium py-2 px-4 text-gray1 rounded-md"
              >
                Annuler
              </button>
              <button className="bg-primary font-medium py-2 px-4 text-white rounded-md">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tache;
