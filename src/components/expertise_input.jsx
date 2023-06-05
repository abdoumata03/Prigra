import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ReactComponent as Upload } from "../assets/illustrations/upload.svg";
import { storage } from "../services/firebase.jsx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ImageConfig } from "../utils/image-config";
import Lottie from "lottie-react";
import Loader from "../assets/lottie/loader.json";
import { FiTrash2 } from "react-icons/fi";

const ExpertiseInput = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isFileUploding, setIsFileUploading] = useState(false);

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
  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    const storageRef = ref(storage, `/rapports/${fileUploaded?.name}`);
    setIsFileUploading(true);
    setSelectedFile(fileUploaded);
    const uploadTask = uploadBytesResumable(storageRef, fileUploaded);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // CALL THE API HERE
          console.log(url);
          setFileUrl(url);
          setIsFileUploading(false);
          onFileUpload({
            name: fileUploaded.name,
            size: fileUploaded.size,
            type: fileUploaded.type,
            url: url,
          });
        });
      }
    );
  };
  return (
    <div className="flex flex-col justify-center w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <p className="text-gray1 font-bold text-sm mb-4">
        Attacher le rapport d'expertise
      </p>
      {!selectedFile && (
        <div>
          <label
            for="dropzone-file"
            onChange={handleChange}
            className="flex flex-col items-center mb-5 justify-center w-full h-26 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-accent px-3"
          >
            <div className="flex flex-row items-center justify-center gap-5 py-4">
              <Upload />
              <div className="flex flex-col">
                <p className="mb-2 font-semibold text-sm text-gray-500 dark:text-gray-400 text-center">
                  Cliquez pour uploader le fichier
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  DOCX, PDF
                </p>
              </div>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              accept=".pdf"
            />
          </label>
        </div>
      )}
      {selectedFile && (
        <div className="bg-accent rounded-[0.4rem] px-6 py-3 mb-2 w-full flex flex-row justify-between items-center">
          {isFileUploding ? (
            <div className="flex flex-col gap-4 items-center justify-center w-full">
              <Lottie animationData={Loader} loop={true} />
              <p className="text-sm font-medium text-gray1">
                Veullize patienter...
              </p>
            </div>
          ) : (
            <>
              <div className="w-8 mr-3">
                {ImageConfig[selectedFile?.type.split("/")[1]]}
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <a
                  href={fileUrl}
                  target="_blank"
                  className="font-medium text-sm text-gray1 mb-1 truncate"
                >
                  {selectedFile.name}
                </a>
                <p className="font-regualar text-xs text-gray3">
                  {bytesToMB(selectedFile.size)}
                </p>
              </div>
              <div
                className="ml-3 cursor-pointer text-error"
                onClick={() => setSelectedFile(null)}
              >
                <FiTrash2 />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpertiseInput;
