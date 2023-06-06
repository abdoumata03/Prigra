import React, { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as Save } from "../assets/icons/save.svg";
import { ProfileInputField } from "../components/index.js";
import ProfileContext from "../context/profile-context";
import { useForm, FormProvider } from "react-hook-form";
import Breadcrumbs from "../components/breadcrumbs";
import { FiTrash2, FiX } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { storage } from "../services/firebase.jsx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

let initialFormValues;

const Profile = () => {
  const {
    userData,
    userInitialData,
    putUserTypeInfo,
    deleteProfilePicture,
  } = useContext(ProfileContext);

  const [userType, setUserType] = useState(userInitialData?.type);

  const [IsDeletingProfilePicture, setIsDeletingProfilePicture] = useState(
    false
  );

  const [isDeleteAvatarDialogOpen, setIsDeleteAvatarDialogOpen] = useState(
    false
  );

  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const onClickDeleteAvatar = () => {
    setIsDeleteAvatarDialogOpen(true);
  };

  const onClickCloseDeleteAvatarDialog = () => {
    setIsDeleteAvatarDialogOpen(false);
  };

  const onClickConfirmDeleteAvatar = async () => {
    setIsDeletingProfilePicture(true);
    await toast.promise(deleteProfilePicture(), {
      loading: "En train de supprimer votre photo de profile...",
      error: "Erreur lors la supression de votre photo de profile",
      success: "Votre photo de profile a été supprimé",
    });
    setImagePreview(null);
    setIsDeletingProfilePicture(false);
    setIsDeleteAvatarDialogOpen(false);
  };

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChangeProfilePicture = async (event) => {
    const fileUploaded = event.target.files[0];
    const storageRef = ref(storage, `/images/${fileUploaded?.name}`);
    const uploadTask = toast.promise(
      uploadBytesResumable(storageRef, fileUploaded),
      {
        loading: "En train de uploader votre photo de profile...",
        error: "Erreur lors le télechargement de photo...",
        success: "Votre nouvelle photo de profile a été bien uploadé",
      }
    );

    setImagePreview(URL.createObjectURL(fileUploaded));
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      }
    );
  };

  const renderProfilePicture = () => {
    if (imagePreview) {
      return imagePreview;
    } else if (userData?.profil_picture) {
      return userData?.profil_picture;
    } else if (!userData?.profil_picture) {
      return "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg";
    }
  };

  const methods = useForm();

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    initialFormValues = getValues();
  }, []);

  const changedValues = {};

  const handleFormSave = async () => {
    const formValues = getValues();

    for (const key in initialFormValues) {
      if (
        initialFormValues.hasOwnProperty(key) &&
        initialFormValues[key] !== formValues[key]
      ) {
        changedValues[key] = formValues[key];
      }
    }

    if (imageUrl) {
      changedValues["profil_picture"] = imageUrl;
    }

    if (Object.keys(changedValues).length > 0) {
      await toast.promise(putUserTypeInfo(changedValues), {
        loading: "En train de sauvegarder vos données...",
        error: "Erreur lors la sauvegarde de vos données...",
        success: "Votre profile a été bien mis à jour",
      });
    }
  };
  return (
    <>
      <Breadcrumbs />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleFormSave)}
            className="flex flex-col w-[90%] lg:w-full lg:flex-row gap-12"
          >
            <div className="mb-0 lg:mb-8 w-auto lg:w-[40%]">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-10">
                <img
                  src={renderProfilePicture()}
                  alt="Avatar Picture"
                  className="w-[110px] h-[110px] rounded-full object-contain bg-white"
                />
                <div className="flex flex-col items-start gap-2">
                  <button
                    onClick={handleClick}
                    type="button"
                    className="h-[45px] text-sm border border-primary text-primary font-bold rounded-[0.4rem] px-5 w-full"
                  >
                    Changer la photo
                  </button>
                  <input
                    type="file"
                    name="profil_picture"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: "none" }}
                    ref={hiddenFileInput}
                    onChange={handleChangeProfilePicture}
                  />
                  <button
                    onClick={onClickDeleteAvatar}
                    type="button"
                    disabled={!userData?.profil_picture}
                    className="h-[45px] disabled:opacity-50 border text-sm border-error font-bold text-error rounded-[0.4rem] px-5 w-full flex justify-center items-center gap-3"
                  >
                    <FiTrash2 />
                    Supprimer
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <ProfileInputField
                  field_name={"Nom complet"}
                  name={"full_name"}
                  value={userData?.first_name + " " + userData?.last_name}
                />
                <ProfileInputField
                  field_name={"Adresse email"}
                  value={userData?.email}
                  name={"email"}
                />
                <ProfileInputField
                  field_name={"Numéro de téléphone"}
                  name={"phone_number"}
                  input_type={"number"}
                  value={userData?.phone_number}
                />
                <ProfileInputField
                  field_name={"Date de naissance"}
                  name={"birth_date"}
                  input_type={"date"}
                  value={userData?.birth_date}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="font-bold text-md">Informations académiques</h1>
                <ProfileInputField
                  field_name={"Numéro d'inscription"}
                  name={"num_inscription"}
                  value={userData?.num_inscription}
                />
                <ProfileInputField
                  field_name={"Etablissement"}
                  value={userData?.etablissment}
                  name={"etablissment"}
                />
                <div className="flex gap-6">
                  <ProfileInputField
                    field_name={"Filière"}
                    value={userData?.filière}
                    name={"filière"}
                  />
                  <ProfileInputField
                    field_name={"Spécialité"}
                    value={userData?.spécialité}
                    name={"spécialité"}
                  />
                </div>
              </div>
              <button className="flex disabled:opacity-50 justify-center items-center gap-3 self-end h-[40px] md:h-[50px] bg-primary text-white text-sm md:text-md font-semibold rounded-[0.4rem] px-5 mb-10 lg:mb-0 mt-10 w-full md:w-auto">
                <Save />
                Sauvegarder
              </button>
            </div>
          </form>
        </FormProvider>
        {isDeleteAvatarDialogOpen && (
          <div className="fixed inset-0 px-10 flex items-center justify-center bg-black bg-opacity-25">
            <div className="w-2/5 rounded-lg flex flex-col items-start bg-white justify-center">
              <div className="flex flex-col items-start py-4 px-10 w-full">
                <div className="flex items-center gap-20 mb-4 w-full">
                  <h1 className="text-gray1 text-lg font-bold flex-1 ">
                    Cofirmer l'action
                  </h1>
                  <div
                    onClick={onClickCloseDeleteAvatarDialog}
                    className="text-gray3 cursor-pointer"
                  >
                    <FiX />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray3 mb-6">
                  Êtes-vous sûr de vouloir supprimer votre photo de profile?
                </p>
              </div>
              <div className="w-full flex-col md:flex-row flex items-center justify-end gap-2 px-8 h-fit py-4 bg-gray-100 rounded-b-lg">
                <div
                  onClick={onClickCloseDeleteAvatarDialog}
                  className="flex flex-row justify-center px-5 py-3 rounded-[0.4rem] cursor-pointer border bg-white "
                >
                  <h1 className=" text-gray2">Annuler</h1>
                </div>
                <button
                  onClick={onClickConfirmDeleteAvatar}
                  type="button"
                  disabled={IsDeletingProfilePicture}
                  className="flex flex-row items-center gap-2 rounded-[0.4rem] px-5 py-3 text-white bg-error cursor-pointer"
                >
                  <FiTrash2 />
                  <h1>Confirmer</h1>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
