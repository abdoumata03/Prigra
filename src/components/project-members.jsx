import React, { useContext, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProfileContext from "../context/profile-context";
import ProjectInputField from "./input_field";
import { FiUserPlus, FiSend, FiMail } from "react-icons/fi";
import InviteEncadrant from "./encadrant_invitation";
import { v4 as uuid } from "uuid";
import InvitedMember from "./invited-member";
import ProjectContext from "../context/project-context";
import { Toaster, toast } from "react-hot-toast";

const ProjectThirdStep = () => {
  const { userData, projectData } = useContext(ProfileContext);

  const invited_members = projectData?.members.map((item) => item.email);

  const [encInputList, setEncInputList] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState(invited_members);

  const schema = yup.object().shape({
    invited_mail: yup
      .string()
      .email("L'adresse email n'est pas valide")
      .required("Veuillez saisir un adresse email"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleDeleteEnc = (index) => {
    setEncInputList((oldValues) => oldValues.filter((_, i) => i !== index));
  };

  const handleAddEnc = () => {
    if (encInputList.length < 3) {
      setEncInputList([...encInputList, "HI"]);
    }
  };

  const { inviteProjectMember } = useContext(ProjectContext);

  const addMember = async (data) => {
    if (invitedMembers.length < 5) {
      try {
        await inviteProjectMember(data.invited_mail);
        setInvitedMembers([...invitedMembers, data.invited_mail]);
      } catch (error) {
        if (error.message.includes("ALREADY")) {
          toast.error(data.invited_mail + " est déja un membre dans un projet");
        } else if (error.message.includes("NOT")) {
          toast.error(data.invited_mail + " n'est pas un étudiant!");
        }
      }
    }
    reset();
  };

  return (
    <div className="flex flex-row gap-16">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col gap-4 w-[45%]">
        <div className="bg-white rounded-[5px] shadow-custom border flex flex-col justify-center py-3 px-5">
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
        {invitedMembers.map((item, index) => index > 0 && <div>{item}</div>)}

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(addMember)}
            className="flex items-end gap-2"
          >
            <div className="flex-1">
              <ProjectInputField
                name={"invited_mail"}
                icon={<FiMail />}
                field_name={"Les membres de l'équipe"}
                className="flex-1"
              />
            </div>
            <button className="h-[40px] flex items-center justify-center gap-2 text-sm font-medium text-white px-4 rounded-[5px] bg-primary">
              <FiSend /> Inviter
            </button>
          </form>
        </FormProvider>
        <div>
          {invitedMembers.map((item, index) => (
            <InvitedMember key={index} name={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-[50%]">
        <p className="text-[13px] font-medium text-gray3 mb-1">Encadrement</p>
        <div className="mr-[1.875rem]">
          <InviteEncadrant optional={false} />
        </div>
        {encInputList.map((item, index) => (
          <div key={uuid()}>
            <InviteEncadrant onDelete={() => handleDeleteEnc(index)} />
          </div>
        ))}
        {encInputList.length < 3 && (
          <button
            onClick={handleAddEnc}
            className="border-2 border-dashed rounded-[5px] h-[42px] text-sm flex justify-center items-center gap-2 text-gray2 mr-[1.875rem]"
          >
            <FiUserPlus />
            Ajouter un enseignant
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectThirdStep;
