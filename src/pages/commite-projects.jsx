import { useContext, useState, useEffect } from "react";
import ProjectContext from "../context/project-context";
import { useNavigate } from "react-router";
import { ReactComponent as Search } from "../assets/icons/Search.svg";
import Breadcrumbs from "../components/breadcrumbs";

const ComiteProjects = () => {
  const { projects, submitReponses } = useContext(ProjectContext);

  const [searchProject, setSearchProject] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("all");

  const navigate = useNavigate();

  const columnTitles = ["Projet", "PDP", "Date de soumission", "Status"];

  const filteredSearchProjects = projects?.filter((project) =>
    project.nom_scientifique.toLowerCase().includes(searchProject.toLowerCase())
  );

  const filterProjects = (status) => {
    if (status === "all") {
      return filteredSearchProjects;
    } else {
      return projects.filter((project) => project.reponse === status);
    }
  };

  const handleClick = (project) => {
    navigate(`/commite-projects/${project.id}`, { state: project });
  };

  const handleSoumission = async () => {
    projects?.map((project) => submitReponses(project.id, true));
  };

  return (
    <>
      <div className="w-11/12 flex flex-row justify-between items-center">
        <Breadcrumbs />
        <button
          onClick={handleSoumission}
          className="flex justify-center text-success items-center gap-3 self-end h-[40px] md:h-[50px] border-success border text-sm md:text-md font-medium rounded-[0.4rem] px-5 mb-10  w-full md:w-auto"
        >
          Soummetre les réponses
        </button>
      </div>
      <div className="flex flex-col w-11/12">
        <h1 className="text-gray1 text-lg font-bold mb-6">Liste des projets</h1>
        <div className="flex flex-row justify-between mb-10">
          <div className="relative  w-1/2  flex flex-row items-center">
            <input
              type="text"
              placeholder="Rechercher un projet"
              className="text-[15px] outline-none py-3 w-full sm:px-5 px-[1px] rounded-md border border-gray6  bg-white "
              onChange={(event) => setSearchProject(event.target.value)}
            />
            <div className="absolute right-0 px-4 h-full flex items-center bg-white rounded-r-md border border-l-0 border-gray6">
              <Search />
            </div>
          </div>
          <div>
            <select
              className="px-5 py-3 rounded-md text-gray2 font-medium border border-gray6 outline-none text-[15px]"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Statuts</option>
              <option value="RECOURS">En recours</option>
              <option value="ACCEPTÉ">Accepté</option>
              <option value="REJETÉ">Rejeté</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray1">
            <thead className=" bg-accent font-bold">
              <tr>
                {columnTitles.map((title, index) => (
                  <th key={index} scope="col" className="px-6 py-4">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filterProjects(selectedStatus)?.map((project, index) => {
                const getColor = () => {
                  if (project.reponse === "ACCEPTÉ") {
                    return "text-success";
                  } else if (project.reponse === "REJETÉ") {
                    return "text-error";
                  } else if (project.reponse === "RECOURS") {
                    return "text-primary";
                  }

                  return "text-gray3";
                };
                return (
                  <tr
                    key={index}
                    onClick={() => handleClick(project)}
                    className="border-b bg-white font-meduim text-gray3 cursor-pointer"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray1"
                    >
                      {project?.nom_scientifique}
                    </th>
                    <td className="px-6 py-4">{project?.owner?.full_name}</td>
                    <td className="px-6 py-4">{project?.created_at}</td>
                    <td className={` px-6 py-4 ${getColor()} `}>
                      {project?.reponse ? project?.reponse : "Aucune réponse"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ComiteProjects;
