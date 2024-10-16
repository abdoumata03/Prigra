import React, { useContext, useState } from "react";
import { ReactComponent as Upload } from "../assets/illustrations/upload.svg";
import { ImageConfig } from "../utils/image-config";
import { storage } from "../services/firebase.jsx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Toaster, toast } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import ProjectContext from "../context/project-context";
import ProfileContext from "../context/profile-context";

const WorkDoneInput = ({ task_id }) => {
  const { projectData } = useContext(ProfileContext);
  const {
    tasksData,
    putProjectTaskFile,
    getProjectTasks,
    deleteFile,
  } = useContext(ProjectContext);

  const task = tasksData?.find((obj) => obj.id === task_id);

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

  const onFileUpload = (e) => {
    const newFile = e.target.files[0];

    if (newFile) {
      const storageRef = ref(storage, `/task_files/${newFile?.name}`);
      const uploadTask = toast.promise(
        uploadBytesResumable(storageRef, newFile),
        {
          loading: "En train d'uploader le fichier...",
          error: "Erreur lors l'upload du fichier",
          success: "Le fichier a été bien ajouté",
        }
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            await putProjectTaskFile(
              newFile.name,
              newFile.size,
              newFile.type.split("/")[1],
              url,
              task_id
            );
            await getProjectTasks(projectData?.id);
          });
        }
      );
    }
  };

  const fileRemove = async (id) => {
    await toast.promise(deleteFile(id), {
      loading: "En train de supprimer le fichier...",
      success: "Ce fichier a été supprimé",
      error: "Erreur lors la supression de fichier",
    });
    await getProjectTasks(projectData?.id);
  };

  return (
    <div className="flex flex-col justify-center w-full">
      <Toaster position="top-center" reverseOrder={false} />

      <label
        for="dropzone-file"
        onChange={onFileUpload}
        className="flex flex-col items-center mb-5 justify-center w-full h-26 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-accent px-3"
      >
        <div className="flex flex-row items-center justify-center gap-5 pt-5 pb-6">
          <Upload />
          <div className="flex flex-col">
            <p className="mb-2 font-semibold text-sm text-gray-500 dark:text-gray-400 text-center">
              Cliquez pour uploader un fichier
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              DOCX, PDF, JPG, PNG
            </p>
          </div>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          accept=".jpg, .jpeg, .png, .doc, .docx, .pdf"
        />
      </label>
      {task?.files?.reverse().map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-custom rounded-[0.4rem] px-6 py-3 mb-2 w-full flex flex-row justify-between items-center"
        >
          <div className="w-8 mr-3">{ImageConfig[item.format]}</div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <p className="font-medium text-sm text-gray1 mb-1 truncate">
              {item.name}
            </p>
            <p className="font-regualar text-xs text-gray3">
              {bytesToMB(item.size)}
            </p>
          </div>
          <div
            className="ml-3 cursor-pointer"
            onClick={() => fileRemove(item.id)}
          >
            <FiTrash2 />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkDoneInput;
