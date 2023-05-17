import { createContext, useState } from "react";

const ProfileContext = createContext();

export default ProfileContext;

export const ProfileProvider = ({ children }) => {
  const [userInitialData, setUserInitialData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const [isInvitationLoading, setIsInvitationLoading] = useState(false);
  const [hasProject, setHasProject] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [type, setType] = useState(null);
  const [projectData, setProjectData] = useState(null);

  const fetch_user = async () => {
    setIsLoading(true);

    const response_me = await fetch(
      "https://prigra.onrender.com/auth/users/me/",
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
        },
      }
    );

    const me_data = await response_me.json();
    setUserInitialData(me_data);
    const user_type = me_data.type;
    const user_id = me_data.type_id;

    const fetch_user_type = await fetch(
      `https://prigra.onrender.com/base/${user_type}/${user_id}/`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
        },
      }
    );

    const user_type_data = await fetch_user_type.json();

    setUserData(user_type_data);

    if (user_type_data.project_id !== null) {
      setHasProject(true);
      setProjectId(user_type_data.project_id);

      const project_response = await fetch(
        `https://prigra.onrender.com/diplome/projects/${user_type_data.project_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem("authTokens")).access
            }`,
          },
        }
      );

      const project_response_data = await project_response.json();

      console.log(project_response_data.co_encadrant);

      setProjectData(project_response_data);

      setType((_) => project_response_data.type);
    }

    setIsLoading(false);
  };

  const fetch_project = async ({ isInvitation = false } = {}) => {
    isInvitation ? setIsInvitationLoading(true) : setIsProjectLoading(true);

    const project_response = await fetch(
      `https://prigra.onrender.com/diplome/projects/${projectId}/`,
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
        },
      }
    );

    const project_response_data = await project_response.json();
    setProjectData(project_response_data);

    isInvitation ? setIsInvitationLoading(false) : setIsProjectLoading(false);
  };

  const contextData = {
    fetch_user,
    hasProject,
    userData,
    projectId,
    setProjectId,
    isLoading,
    isInvitationLoading,
    projectData,
    isProjectLoading,
    fetch_project,
    userInitialData,
    type,
    setType,
    setHasProject,
  };

  return (
    <ProfileContext.Provider value={contextData}>
      {children}
    </ProfileContext.Provider>
  );
};
