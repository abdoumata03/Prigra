import { createContext, useState, useEffect, useContext } from "react";
import ProfileContext from "./profile-context";
import { toast } from "react-toastify";

const ProjectContext = createContext();

export default ProjectContext;

export const ProjectProvider = ({ children }) => {
  const { projectId, projectData } = useContext(ProfileContext);
  const [projects, setProjects] = useState(null);
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);
  const [type, setType] = useState(projectData?.type);

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

  const inviteProjectMember = async (email) => {
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

    if (response["error"].includes("not a student")) {
      throw new Error("NOT A STUDENT");
    } else if (response["error"].includes("already member")) {
      throw new Error("ALREADY");
    }
  };


  const fetch_projects = async () => {
    setIsProjectsLoading(true);
    const projectsResponse = await fetch(
      "https://prigra.onrender.com/diplome/projects/", 
      {
        method : "GET", 
        headers : {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
            }`,   
        }
      }
    ); 

    const projects_response_data = await projectsResponse.json();
    setProjects(projects_response_data); 
    setIsProjectsLoading(false);
  }

  const deleteProject = async (ID) => {
    const deleteResponse = await fetch(
      `https://prigra.onrender.com/diplome/projects/${ID}/`,
      {
        method : "DELETE", 
        headers :  {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
            }`,
            "content-type": "application/json",
          }
      } 
    )
  }

  const contextData = {
    type,
    setType,
    createProject,
    putProjectType,
    putProjectInfo,
    inviteProjectMember,
    projects, 
    fetch_projects, 
    isProjectsLoading, 
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
