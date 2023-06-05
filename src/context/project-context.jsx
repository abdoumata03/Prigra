import { createContext, useState, useContext } from "react";
import ProfileContext from "./profile-context";
import { async } from "q";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router";
import { format } from "date-fns";

const ProjectContext = createContext();

export default ProjectContext;

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState(null);

  const [stats, setStats] = useState({});
  const [Soutenances, setSoutenances] = useState([]);
  const [ProjectSoutenance, setProjectSoutenance] = useState([]);

  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [projectReponse, setProjectReponse] = useState(null);
  const {
    projectId,
    setProjectId,
    setHasProject,
    projectData,
    type,
    fetch_project,
  } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [tasksData, setTasksData] = useState([]);

  const [projectTask, setProjectTask] = useState(null);

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

    const result = {
      statusCount: {},
      typeCounts: {},
      ownerTypeCounts: {},
    };

    projects_response_data.forEach((object) => {
      const { type, status_reponse, owner } = object;

      if (result.statusCount.hasOwnProperty(status_reponse)) {
        result.statusCount[status_reponse]++;
      } else {
        result.statusCount[status_reponse] = 1;
      }

      if (result.typeCounts.hasOwnProperty(type)) {
        result.typeCounts[type]++;
      } else {
        result.typeCounts[type] = 1;
      }

      const ownerType = owner.type;
      if (result.ownerTypeCounts.hasOwnProperty(ownerType)) {
        result.ownerTypeCounts[ownerType]++;
      } else {
        result.ownerTypeCounts[ownerType] = 1;
      }
    });

    setProjects(projects_response_data);
    setStats(result);

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
    console.log(encadrant);
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
          encadrant: encadrant[0],
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
          co_encadrant: co_encadrant[0],
        }),
      }
    );

    setIsInvitationLoading(true);

    if (!put_enc_resposne.ok) {
      throw new Error("Erreur lors l'envoi d'invitation");
    }

    return put_enc_resposne.status;
  };

  const putTauxAvancement = async (project_id, taux) => {
    await fetch(`https://prigra.onrender.com/diplome/projects/${project_id}/`, {
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
    toast.loading("deleting project...");
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
    if (deleteResponse.ok) {
      toast.dismiss();
      toast.success("project deleted");
    } else {
      toast.dismiss();
      toast.error("Failed to delete project");
    }
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

    const task_list = await get_tasks_response.json();
    setTasksData(task_list);
  };

  const deleteProjectTask = async (project_id, task_id) => {
    await fetch(
      `https://prigra.onrender.com/diplome/projects/${project_id}/tasks/${task_id}/`,
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
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          start_date: format(data.start_date, "yyyy-MM-dd"),
          end_date: format(data.end_date, "yyyy-MM-dd"),
          status: data.status,
        }),
      }
    );
  };

  const putProjectTask = async (data, task_id) => {
    await fetch(
      `https://prigra.onrender.com/diplome/projects/${projectData?.id}/tasks/${task_id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
          status: data.status,
        }),
      }
    );
  };

  const putProjectTaskFile = async (name, size, format, url, task_id) => {
    await fetch(
      `https://prigra.onrender.com/diplome/projects/${projectData?.id}/tasks/${task_id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          files: [
            {
              name: name,
              format: format,
              size: size,
              url: url,
            },
          ],
        }),
      }
    );
  };

  const putWorkDone = async (data, task_id) => {
    await fetch(
      `https://prigra.onrender.com/diplome/projects/${projectData?.id}/tasks/${task_id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          work_done: data.work_done,
        }),
      }
    );
  };

  const getProjectTask = async (task_id) => {
    const project_task_response = await fetch(
      `https://prigra.onrender.com/diplome/projects/${projectData.id}/tasks/${task_id}/`,
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

    const project_task = await project_task_response.json();
    setProjectTask(project_task);
  };

  const ProjectReponse = async (
    project_pk,
    reponse,
    rapportName,
    rapportSize,
    rapportFormat,
    rapportUrl
   ) => {
      toast.loading('En train de soumetre la réponse...'); 
      const project_reponse_response = await fetch(
        `https://prigra.onrender.com/diplome/projects/${project_pk}/responses/`,
        {
          method: 'POST',
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem('authTokens')).access
            }`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
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
        toast.dismiss();
        toast.success('la réponse a été soumis');
      } else {
        toast.dismiss();
        toast.error('Erreur lors la soumission de projet');
      }
  };

  const fetchProjectReponse = async (project_pk) => {
    const project_fetch_response = await fetch(
      `https://prigra.onrender.com/diplome/projects/${project_pk}/responses/`,
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
    const reponse_data = await project_fetch_response.json();
    setProjectReponse(reponse_data[0]);
    
  };


  const getProjectSoutenance = async (id) => {
    const soutenance_response = await fetch(
      `https://prigra.onrender.com/diplome/soutenances/${id}/`,
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

    const soutenance_data = await soutenance_response.json();
    setProjectSoutenance(soutenance_data);
  };

  const getSoutenances = async () => {
    const soutenances_response = await fetch(
      `https://prigra.onrender.com/diplome/soutenances/`,
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

    const soutenances_data = await soutenances_response.json();
    setSoutenances(soutenances_data);
  };

  const putProjectResponse = async (
    project_pk,
    id,
    reponse,
    rapportName,
    rapportSize,
    rapportFormat,
    rapportUrl
  ) => {
    toast.loading("En train de modifier la réponse...");
    const put_project_reponse_response = await fetch(
      `https://prigra.onrender.com/diplome/projects/${project_pk}/responses/${id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
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
    if (put_project_reponse_response.ok) {
      toast.dismiss();
      toast.success("la réponse a été mis à jour");
    } else {
      toast.dismiss();
      toast.error("Erreur lors la mise à jour de projet");
    }
  };

  const deleteProjectReponse = async (project_pk, id) => {
    toast.loading("En train de supprimer la réponse...");
    const delete_project_reponse_response = await fetch(
      `https://prigra.onrender.com/diplome/projects/${project_pk}/responses/${id}/`,
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
    if (delete_project_reponse_response.ok) {
      toast.dismiss();
      toast.success("la réponse a été supprimée");
    } else {
      toast.dismiss();
      toast.error("Erreur lors la suppression de réponse");
    }
  };

  const submitReponses = async (project_id, is_all) => {
    toast.loading("En train d'envoyer les réponses...");
    const submit_response = await fetch(
      `https://prigra.onrender.com/diplome/submit/`,
      {
        method: "POST",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          project_id,
          is_all,
        }),
      }
    );
    if (submit_response.ok) {
      toast.dismiss();
      toast.success("les réponses ont été envoyées");
    } else {
      toast.dismiss();
      toast.error("Erreur lors l'envoi des réponses");
    }
  };
  const contextData = {
    createProject,
    isInvitationLoading,
    putProjectType,
    setIsPuttingInfo,
    putProjectInfo,
    putTauxAvancement,
    putWorkDone,
    inviteProjectMember,
    invitationsList,
    deleteFile,
    getInvitationList,
    stats,
    putProjectTask,
    activeStep,
    setActiveStep,
    putEnc,
    putCoEnc,
    addProjectTask,
    putProjectTaskFile,
    isPuttingInfo,
    projects,
    tasksData,
    fetch_projects,
    isProjectsLoading,
    deleteProject,
    ProjectReponse,
    putProjectFile,
    getProjectTasks,
    getProjectTask,
    deleteProjectTask,
    fetchProjectReponse,
    deleteProjectReponse,
    putProjectResponse,
    projectReponse,
    submitReponses,
    getSoutenances,
    getProjectSoutenance,
    ProjectSoutenance,
  };

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
