import React, { useContext, useEffect } from "react";
import ProjectInputField from "./input_field";
import FileInput from "./file_input";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ProjectContext from "../context/project-context";
import ProfileContext from "../context/profile-context";

const ProjectInfo = ({ innerRef }) => {
  const { putProjectInfo, setIsPuttingInfo, setActiveStep } = useContext(
    ProjectContext
  );
  const { projectData, fetch_project } = useContext(ProfileContext);

  const methods = useForm();

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods; 

  let initialFormValues;

  useEffect(() => {
    initialFormValues = JSON.stringify(getValues());
  }, []);

  const onSubmit = async (data) => {
    const formValues = JSON.stringify(getValues());

    if (formValues !== initialFormValues) {
      setIsPuttingInfo(true);
      await putProjectInfo(
        data.nom_scientifique,
        data.nom_commercial,
        data.description
      );
      await fetch_project();
      setIsPuttingInfo(false);
      setActiveStep((prev) => prev + 1);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col gap-3 w-1/2">
            <ProjectInputField
              name={"nom_scientifique"}
              defaultValue={projectData?.nom_scientifique}
              field_name="Nom scientifique"
              hint={"ex. plateforme de location de logements "}
            />
            <ProjectInputField
              name={"nom_commercial"}
              defaultValue={projectData?.nom_commercial}
              field_name="Nom commercial"
              hint={"ex. Ekrili"}
            />
            <ProjectInputField
              defaultValue={projectData?.description}
              name={"description"}
              field_name="Description"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-[13px] font-medium text-gray3 mb-3">
              Attacher des fichiers
            </p>
            <FileInput isInvitaion={true} />
          </div>
        </div>
        <button ref={innerRef} className="hidden"></button>
      </form>
    </FormProvider>
  );
};

export default ProjectInfo;
