import React, { useState } from "react";
import { ReactComponent as Upload } from "../assets/illustrations/upload.svg";
import { ReactComponent as Delete } from "../assets/icons/delete.svg";
import { ImageConfig } from "../utils/image-config";

const FileInput = ({ onFileChange }) => {
  const [fileList, setFileList] = useState([]);

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
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <div class="flex flex-col items-center justify-center w-full">
      <label
        for="dropzone-file"
        onChange={onFileUpload}
        class="flex flex-col items-center mb-5 justify-center w-full h-26 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-row items-center justify-center gap-5 pt-5 pb-6">
          <Upload />
          <div className="flex flex-col">
            <p class="mb-2 font-semibold text-sm text-gray-500 dark:text-gray-400 text-center">
              Cliquez pour uploader un fichier
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
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
      {fileList.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-custom rounded-[5px] px-6 py-3 mb-2 w-full flex flex-row justify-between items-center"
        >
          <div className="w-8 mr-3">{ImageConfig[item.type.split("/")[1]]}</div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <p className="font-medium text-sm text-gray1 mb-1 truncate">
              {item.name}
            </p>
            <p className="font-regualar text-xs text-gray3">
              {bytesToMB(item.size)}
            </p>
          </div>
          <button className="ml-3" onClick={() => fileRemove(item)}>
            <Delete />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileInput;
