import { createContext, useState, useContext } from "react";
import ProfileContext from "./profile-context";
import { async } from "q";
import { toast } from 'react-hot-toast';

const ProjectContext = createContext();

export default ProjectContext;

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const {
    projectId,
    setProjectId,
    setHasProject,
    type,
    fetch_project,
  } = useContext(ProfileContext);

  const [tasksData, setTasksData] = useState([
    {
      id: "J00005",
      title: "Task 5",
      status: "À faire",
      description: "Implement new feature",
      startDate: "2023-05-25",
      endDate: "2023-06-05",
      workDone: "Some Work",
      files: [
        {
          id: 0,
          name: "fichier",
          size: 1254,
          format: "png",
          url: "www.google.com",
        },
      ],
    },
    {
      id: "J00006",
      title: "Task 6",
      status: "En cours",
      description: "Design user interface",
      startDate: "2023-05-21",
      endDate: "2023-05-30",
    },
    {
      id: "J00007",
      title: "Task 7",
      status: "Complétée",
      description: "Optimize database queries",
      startDate: "2023-05-22",
      endDate: "2023-05-28",
    },
  ]);
  const [invitationsList, setInvitationsList] = useState([]);

  const [isPuttingInfo, setIsPuttingInfo] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [isInvitationLoading, setIsInvitationLoading] = useState(false);

  const createProject = async () => {
    const project_response = await fetch(
      `https://prigra.onrender.com/diplome/projects/`,
      {
        method: "POST",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
      }
    );

    const resp = await project_response.json();
    setProjectId(resp.id);

    setHasProject(true);
  };

  const putProjectType = async () => {
    await fetch(`https://prigra.onrender.com/diplome/projects/${projectId}/`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${
          JSON.parse(localStorage.getItem("authTokens")).access
        }`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        type,
      }),
    });
  };

  const putProjectInfo = async (
    nom_scientifique,
    nom_commercial,
    description
  ) => {
    await fetch(`https://prigra.onrender.com/diplome/projects/${projectId}/`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${
          JSON.parse(localStorage.getItem("authTokens")).access
        }`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nom_commercial,
        nom_scientifique,
        description,
      }),
    });
  };

  const putProjectFile = async (name, size, format, url) => {
    await fetch(`https://prigra.onrender.com/diplome/projects/${projectId}/`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${
          JSON.parse(localStorage.getItem("authTokens")).access
        }`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        project_files: [
          {
            name: name,
            size: size,
            format: format,
            url: url,
          },
        ],
      }),
    });

    await fetch_project({ isFileSubmit: true });
  };

  const deleteFile = async (fileId) => {
    await fetch(`https://prigra.onrender.com/diplome/files/${fileId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${
          JSON.parse(localStorage.getItem("authTokens")).access
        }`,
      },
    });
    await fetch_project({ isFileSubmit: true });
  };

  const inviteProjectMember = async (email) => {
    setIsInvitationLoading(true);

    const invitationResponse = await fetch(
      `https://prigra.onrender.com/diplome/invitation/`,
      {
        method: "POST",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          project_id: projectId,
        }),
      }
    );

    const response = await invitationResponse.json();

    setIsInvitationLoading(false);

    if (JSON.stringify(response).includes("not a student")) {
      throw new Error("NOT A STUDENT");
    } else if (JSON.stringify(response).includes("already member")) {
      throw new Error("ALREADY");
    } else if (JSON.stringify(response).includes("objet invitation")) {
      throw new Error("INVITED");
    } else if (JSON.stringify(response).includes("project_id")) {
      throw new Error("SUCCESS");
    }
  };

  const fetch_projects = async () => {
    setIsProjectsLoading(true);
    const projectsResponse = await fetch(
      "https://prigra.onrender.com/diplome/projects/",
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
        },
      }
    );

    const projects_response_data = await projectsResponse.json();
    setProjects(projects_response_data);
    setIsProjectsLoading(false);
  };
  const getInvitationList = async () => {
    const invitationResponse = await fetch(
      `https://prigra.onrender.com/diplome/invitation/`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
      }
    );

    const inv_list = await invitationResponse.json();
    setInvitationsList(inv_list);
  };

  const putEnc = async (encadrant) => {
    setIsInvitationLoading(true);

    const put_enc_resposne = await fetch(
      `https://prigra.onrender.com/diplome/projects/${projectId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          encadrant,
        }),
      }
    );

    setIsInvitationLoading(false);

    if (!put_enc_resposne.ok) {
      throw new Error("Erreur lors l'envoi d'invitation");
    }

    return put_enc_resposne.status;
  };

  const putCoEnc = async (co_encadrant) => {
    setIsInvitationLoading(true);

    const put_enc_resposne = await fetch(
      `https://prigra.onrender.com/diplome/projects/${projectId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          co_encadrant,
        }),
      }
    );

    setIsInvitationLoading(true);

    if (!put_enc_resposne.ok) {
      throw new Error("Erreur lors l'envoi d'invitation");
    }

    return put_enc_resposne.status;
  };

  const putTauxAvancement = async (taux) => {
    await fetch(`https://prigra.onrender.com/diplome/projects/${projectId}/`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${
          JSON.parse(localStorage.getItem("authTokens")).access
        }`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        taux_avancement: taux,
      }),
    });
  };

  const deleteProject = async (id) => {
    const deleteResponse = await fetch(
      `https://prigra.onrender.com/diplome/projects/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
      }
    );
  };

  const getProjectTasks = async (project_id) => {
    const get_tasks_response = await fetch(
      `https://prigra.onrender.com/diplome/projects/${project_id}/tasks/`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
      }
    );
  };

  const deleteProjectTask = async (project_id, task_id) => {
    await fetch(
      `https://prigra.onrender.com/diplome/projects/${project_id}/tasks/${task_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
      }
    );
  };

  const addProjectTask = async (project_id, data) => {
    const add_task_reponse = await fetch(
      `https://prigra.onrender.com/diplome/projects/${project_id}/tasks/`,
      {
        method: "POST",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    );
  };

  const ProjectReponse = async (
    project_id,
    reponse,
    rapportName,
    rapportSize,
    rapportFormat,
    rapportUrl
   ) => {
      toast.loading('Submitting response...'); 
      const project_reponse_response = await fetch(
        `https://prigra.onrender.com/diplome/responses/`,
        {
          method: 'POST',
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem('authTokens')).access
            }`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            project_id,
            reponse,
            rapport_expertise: {
              name: rapportName,
              size: rapportSize,
              format: rapportFormat,
              url: rapportUrl,
            },
          }),
        }
      );
      if (project_reponse_response.ok) {
        toast.success('Response submitted successfully');
      } else {
        toast.dismiss();
        toast.error('Failed to submit response');
      }
  };



  

  const contextData = {
    createProject,
    isInvitationLoading,
    putProjectType,
    setIsPuttingInfo,
    putProjectInfo,
    putTauxAvancement,
    inviteProjectMember,
    invitationsList,
    deleteFile,
    getInvitationList,
    activeStep,
    setActiveStep,
    putEnc,
    putCoEnc,
    isPuttingInfo,
    projects,
    tasksData,
    fetch_projects,
    isProjectsLoading,
    deleteProject,
    ProjectReponse,
    putProjectFile,
    getProjectTasks,
    deleteProjectTask,
  };

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
