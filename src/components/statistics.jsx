import React, { useContext, useEffect } from "react";
import StatCard from "./stat-card";
import { FiActivity } from "react-icons/fi";

import ProjectContext from "../context/project-context";
import PrettyPie from "./pie_chart";
import Breadcrumbs from "./breadcrumbs";

const Statistics = () => {
  const { stats, projects } = useContext(ProjectContext);

  const ownerTypeData = Object.keys(stats.ownerTypeCounts).map((ownerType) => {
    return {
      name: ownerType,
      value: stats.ownerTypeCounts[ownerType],
    };
  });

  const projectTypeData = Object.keys(stats.typeCounts).map((projectType) => {
    return {
      name: projectType,
      value: stats.typeCounts[projectType],
    };
  });

  const statusData = Object.keys(stats.statusCount).map((status) => {
    return {
      name: status,
      value: stats.statusCount[status],
    };
  });

  const brevetProjects = projectTypeData.find((data) => data.name === "Brevet")
    ?.value;

  const startupProjects = projectTypeData.find(
    (data) => data.name === "Startup"
  )?.value;

  const studentProjects = ownerTypeData.find((data) => data.name === "Student")
    ?.value;

  const teacherProjects = ownerTypeData.find((data) => data.name === "Teacher")
    ?.value;

  const validatedProjects = statusData.find((data) => data.name === "VALIDÉ")
    ?.value;

  const supervisedProjects = statusData.find((data) => data.name === "RECOURS")
    ?.value;

  const rejectedProjects = statusData.find((data) => data.name === "REJETÉ")
    ?.value;

  const soumisProjects = statusData.find((data) => data.name === "EN_COURS")
    ?.value;

  return (
    <div>
      <Breadcrumbs />
      <h1 className="text-gray1 text-xl font-bold mb-6">Statistiques</h1>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <StatCard
              title={"Nombre total de projets"}
              icon={<FiActivity />}
              value={projects?.length}
            />
          </div>
          {/*<div className="bg-white shadow-custom rounded-md border flex py-6 px-10">
            <div className="flex flex-col">
              <p className="text-gray3 font-medium text-sm mb-6">
                Par type de projet
              </p>
              <div className="flex gap-16">
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <p className="font-medium text-gray2">Soumis</p>
                    <h1 className="text-2xl font-bold text-gray1">
                      {soumisProjects ? soumisProjects : 0}
                    </h1>
                  </div>
                  <div>
                    <p className="font-medium text-gray2">Validé</p>
                    <h1 className="text-2xl font-bold text-gray1">
                      {validatedProjects ? validatedProjects : 0}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <p className="font-medium text-gray2">Rejeté</p>
                    <h1 className="text-2xl font-bold text-gray1">
                      {rejectedProjects ? rejectedProjects : 0}
                    </h1>
                  </div>
                  <div>
                    <p className="font-medium text-gray2">Soutenu</p>
                    <h1 className="text-2xl font-bold text-gray1">
                      {supervisedProjects ? supervisedProjects : 0}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <PrettyPie data={statusData} />
            </div>
  </div>*/}
        </div>
        <div className="flex gap-4">
          <div className="bg-white shadow-custom rounded-md border flex py-6 px-4">
            <div className="flex flex-col">
              <p className="text-gray3 font-medium text-sm mb-6">
                Par type de projet
              </p>
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="font-medium text-gray2">Brevet</p>
                  <h1 className="text-2xl font-bold text-gray1">
                    {brevetProjects ? brevetProjects : 0}
                  </h1>
                </div>
                <div>
                  <p className="font-medium text-gray2">Startup</p>
                  <h1 className="text-2xl font-bold text-gray1">
                    {startupProjects ? startupProjects : 0}
                  </h1>
                </div>
              </div>
            </div>

            <div>
              <PrettyPie data={projectTypeData} />
            </div>
          </div>
          <div className="bg-white shadow-custom rounded-md border flex py-6 px-4">
            <div className="flex flex-col">
              <p className="text-gray3 font-medium text-sm mb-6">
                Par porteur de projet
              </p>
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="font-medium text-gray2">Etudiant</p>
                  <h1 className="text-2xl font-bold text-gray1">
                    {studentProjects ? studentProjects : 0}
                  </h1>
                </div>
                <div>
                  <p className="font-medium text-gray2">Enseignants</p>
                  <h1 className="text-2xl font-bold text-gray1">
                    {teacherProjects ? teacherProjects : 0}
                  </h1>
                </div>
              </div>
            </div>

            <div>
              <PrettyPie data={ownerTypeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
