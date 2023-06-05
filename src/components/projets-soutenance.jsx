import React, { useContext, useEffect, useState } from "react";
import ProjectContext from "../context/project-context";
import { tr } from "date-fns/locale";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";

const ProjectSoutenances = () => {
  const columnTitles = [
    "Titre du Projet",
    "Pdp",
    "Encadrant",
    "Plannification",
  ];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const { projects } = useContext(ProjectContext);

  const [SelectedType, setSelectedType] = useState("Tout");

  const [Projects, setProjects] = useState(projects);

  const [searchProject, setSearchProject] = useState("");

  const navigate = useNavigate();

  const filteredSearchProjects = projects?.filter((project) =>
    project.nom_scientifique.toLowerCase().includes(searchProject.toLowerCase())
  );

  const handleClick = (project) => {
    navigate(`/soutenances/project/${project.id}`, { state: project });
  };

  const filteredSoutenances = (filter) => {
    if (filter === "Tout") {
      return filteredSearchProjects;
    } else if (filter === "Plannifié") {
      return filteredSearchProjects.filter((project) => project.soutenance);
    } else if (filter === "Non plannifié") {
      return filteredSearchProjects.filter((project) => !project.soutenance);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="w-11/12 flex flex-col">
      <h1 className="text-gray1 text-lg font-bold mb-2">Liste des projets</h1>

      <div className="flex items-end justify-between mb-6">
        <div className="relative  w-1/2  flex flex-row items-center">
          <input
            type="text"
            placeholder="Rechercher un projet"
            className="text-[15px] outline-none py-3 w-full sm:px-5 px-[1px] rounded-md border border-gray6  bg-white "
            onChange={(event) => setSearchProject(event.target.value)}
          />
          <div className="absolute right-0 px-4 h-full flex items-center bg-white rounded-r-md border border-l-0 border-gray6">
            <FiSearch />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-medium text-gray2 mb-1">Plannification</p>
          <div className="px-4 bg-white border rounded-md border-gray6">
            <select
              className="custom-select py-3 bg-transparent text-gray2 font-medium outline-none text-sm"
              value={SelectedType}
              defaultValue={"Tout"}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option selected>Tout</option>
              <option value="Plannifié">Plannifié</option>
              <option value="Non plannifié">Non plannifié</option>
            </select>
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray1">
        <thead className=" bg-accent font-bold rounded-md">
          <tr>
            {columnTitles.map((title, index) => (
              <th key={index} scope="col" className="px-6 py-4 text-gray2">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredSoutenances(SelectedType).length > 0 ? (
            filteredSoutenances(SelectedType).map((project, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => handleClick(project)}
                  className="border-b bg-white font-meduim text-gray3 cursor-pointer"
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray1">
                    {capitalizeFirstLetter(project?.nom_scientifique)}
                  </th>
                  <td scope="row" className="px-6 py-4 font-medium text-gray1">
                    {capitalizeFirstLetter(project?.owner.full_name)}
                  </td>
                  <td scope="row" className="px-6 py-4 font-medium text-gray1">
                    {project?.encadrant.length > 0 ? (
                      capitalizeFirstLetter(project?.encadrant[0]?.full_name)
                    ) : (
                      <p>/</p>
                    )}
                  </td>
                  <td scope="row" className="px-6 py-4 font-medium text-gray1">
                    {project?.is_authorized ? (
                      <p className="text-success">Plannifié</p>
                    ) : (
                      <p className="text-error">Non plannifié</p>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="border-b bg-white font-meduim text-gray3 cursor-pointer">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray1"
                colspan="4"
              >
                <p className="text-center">Aucun projet trouvé!</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectSoutenances;
