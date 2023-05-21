import React, { useContext, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileContext from "../context/profile-context";
import ProjectInputField from "./input_field";
import { FiSend, FiMail, FiCheck } from "react-icons/fi";
import InviteEncadrant from "./encadrant_invitation";
import InvitedMember from "./invited-member";
import ProjectContext from "../context/project-context";
import { Toaster, toast } from "react-hot-toast";
import { IconContext } from "react-icons";
import "../../src/index.css";

const ProjectThirdStep = ({ innerRef }) => {
  const { userData, projectData, fetch_project } = useContext(ProfileContext);
  const {
    inviteProjectMember,
    isInvitationLoading,
    invitationsList,
    getInvitationList,
    putEnc,
    putCoEnc,
  } = useContext(ProjectContext);

  const enc_list = projectData?.encadrant;
  const co_enc_list = projectData?.co_encadrant;

  const [encList, setEncList] = useState(enc_list);
  const [coEncList, setCoEncList] = useState(co_enc_list);

  const added_members = projectData?.members?.map((item) => item.email);

  const invited_members = invitationsList
    ?.filter((item) => {
      item.project_id === projectData.id && item.type === "Student";
    })
    .map((item) => item.email);

  const [invitedMembers, setInvitedMembers] = useState(invited_members);

  const [addedMembers, setAddedMembers] = useState(added_members);

  const schema = yup.object().shape({
    invited_mail: yup
      .string()
      .email("Veuillez saisir un email valid")
      .required("Veuillez saisir un adresse email"),
  });

  const schema_enc = yup.object().shape({
    enc_mail: yup
      .string()
      .email("Veuillez saisir un email valid")
      .required("Veuillez saisir un adresse email"),
    enc_type: yup.string().required("Veuillez spécifier le type d'encadrant"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const methods_enc = useForm({
    resolver: yupResolver(schema_enc),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const {
    register: register_enc,
    handleSubmit: handleSubmitEnc,
    control,
    formState: { errors: errors_enc },
  } = methods_enc;

  useEffect(() => {
    setAddedMembers(projectData?.members.map((item) => item.email));
  }, [projectData]);

  useEffect(() => {
    console.log(projectData);
    setInvitedMembers(
      invitationsList
        ?.filter(
          (item) =>
            item.project_id === projectData.id && item.type === "Student"
        )
        .map((item) => item.email)
    );
  }, [invitationsList]);

  useEffect(() => {
    getInvitationList();
    console.log(invited_members);
  }, []);

  const addMember = async (data) => {
    if (invitedMembers.length + addedMembers.length < 6) {
      try {
        await inviteProjectMember(data.invited_mail);
        await fetch_project({ isInvitation: true });
      } catch (error) {
        if (error.message.includes("ALREADY")) {
          toast.error(data.invited_mail + " est déja un membre dans un projet");
        } else if (error.message.includes("NOT")) {
          toast.error(data.invited_mail + " n'est pas un étudiant!");
        } else if (error.message.includes("INVITED")) {
          toast.error(data.invited_mail + " est déja invité!");
        } else if (error.message.includes("SUCCESS")) {
          toast.success(data.invited_mail + " a été invité");
          await getInvitationList();
        }
      }
    } else {
      toast.error("Un projet ne doit pas avoir plus de 6 membres");
    }
    reset();
  };

  const handleEncSubmit = async (data) => {
    if (data.enc_type === "Encadrant") {
      try {
        await putEnc([data.enc_mail]);
        toast.success(`Une inviation a été envoyé au ${data.enc_mail}`);
      } catch (error) {
        toast.error(error.message);
      }
    } else if (data.enc_type === "Co-encadrant") {
      try {
        await putCoEnc([data.enc_mail]);
        toast.success(`Une inviation a été envoyé au ${data.enc_mail}`);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex flex-row gap-16">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col gap-4 w-[45%]">
        <div className="bg-white rounded-[0.4rem] shadow-custom border flex flex-col justify-center py-3 px-5">
          <p className="text-[13px] font-medium text-gray3 mb-2">
            Chef d'équipe
          </p>
          <div className="flex">
            <img
              src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
              alt="Avatar Picture"
              className="w-[40px] h-[40px] mr-4 rounded-full"
            />
            <div>
              <h1 className="text-base font-medium text-gray1">
                {userData?.first_name + " " + userData?.last_name}
              </h1>
              <p className="text-xs font-regular text-gray3">
                {userData?.email}
              </p>
            </div>
          </div>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(addMember)}
            className="flex items-end gap-2"
          >
            <div className="flex-1">
              <ProjectInputField
                name={"invited_mail"}
                icon={<FiMail />}
                field_name={"Invitez des membres"}
                className="flex-1"
              />
            </div>
            <button className="h-[40px] flex items-center justify-center gap-2 text-sm font-medium text-white px-4 rounded-[0.4rem] bg-primary">
              <div className={`${isInvitationLoading && `animate-wiggle`}`}>
                <FiSend />
              </div>
              Inviter
            </button>
          </form>
          {errors.invited_mail?.message && (
            <p className="text-error text-xs">
              • {errors.invited_mail?.message}
            </p>
          )}
        </FormProvider>
        <div>
          {addedMembers?.map(
            (item, index) =>
              index > 0 && (
                <div className="bg-white flex items-center rounded-[0.4rem] shadow-custom border py-3 px-5 mb-2">
                  <p className="text-sm text-gray1 font-medium flex-1">
                    {item}
                  </p>
                  <IconContext.Provider value={{ className: "text-primary" }}>
                    <FiCheck />
                  </IconContext.Provider>
                </div>
              )
          )}
          {invitedMembers.map((item, index) => (
            <InvitedMember key={index} name={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-[50%]">
        <p className="text-[13px] font-medium text-gray3">
          Invitez des encadrants
        </p>
        <FormProvider {...methods_enc}>
          <form
            onSubmit={handleSubmitEnc(handleEncSubmit)}
            className="flex flex-col"
          >
            <div>
              <InviteEncadrant
                mail_name={"enc_mail"}
                type_name={"enc_type"}
                optional={false}
              />
              {errors_enc.enc_mail?.message && (
                <p className="text-error text-xs">
                  • {errors_enc.enc_mail.message}
                </p>
              )}
              {errors_enc.enc_type?.message && (
                <p className="text-error text-xs">
                  • {errors_enc.enc_type.message}
                </p>
              )}
            </div>
            <button className="bg-primary w-1/4 mt-3 justify-self-end self-end rounded-[0.4rem] h-[40px] text-sm font-medium flex justify-center items-center gap-2 text-white">
              <div className={`${isInvitationLoading && `animate-wiggle`}`}>
                <FiSend />
              </div>
              Inviter
            </button>
          </form>
        </FormProvider>
        {encList.length > 0 && (
          <p className="text-xs text-gray3 mt-4 mb-1">Encadrants</p>
        )}
        {encList.map((item, index) => (
          <div
            className={`bg-white border shadow-custom  ${index === 0 &&
              `rounded-t-[0.4rem]`} ${index === encList.length - 1 &&
              `rounded-b-[0.4rem]`} px-3 flex flex-col py-3`}
          >
            <p className="text-sm font-medium text-gray1">{item.email}</p>
          </div>
        ))}
        {coEncList.length > 0 && (
          <p className="text-xs text-gray3 mt-4 mb-1">Co-Encadrants</p>
        )}
        {coEncList.map((item, index) => (
          <div
            className={`bg-white border shadow-custom ${index === 0 &&
              `rounded-t-[0.4rem]`} ${index === encList.length - 1 &&
              `rounded-b-[0.4rem]`} px-3 flex flex-col py-3`}
          >
            <p className="text-sm font-medium text-gray1">{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectThirdStep;
