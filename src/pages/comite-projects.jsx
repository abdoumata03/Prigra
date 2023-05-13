import {useContext, useState} from 'react'
import ProjectContext from '../context/project-context'
import { useNavigate } from 'react-router';
import BlueLoadingSpinner from "../components/spinner_blue";

const ComiteProjects = () => {

    const {projects, isProjectsLoading} = useContext(ProjectContext);

    const [searchProject, setSearchProject] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("all");

    const navigate = useNavigate();

    const columnTitles = ["Projet", "PDP", "Date de soumission", "Délai de réponse", "Status"];

    const filteredSearchProjects = projects?.filter(project => project.name.toLowerCase().includes(searchProject.toLowerCase()));
    
    const filterProjects = (status) => {
        if (status === "all") {
          return filteredSearchProjects;
        } else {
          return projects.filter(project => project.status_reponse === status);
        }
      }
    
    const handleClick = (project) => {
        navigate('/project-info', 
        {state: project });     
    }
   if (isProjectsLoading) {
    return (
      <div className=" flex flex-row gap-3 justify-center items-center">
        <BlueLoadingSpinner />
        <p className="text-md text-gray3">
          Nous préparons vos données, merci de patienter...
        </p>
      </div>
    );
  } else {
  return (
    <div className='w-5/6 flex flex-col mt-20'>
        <div className='flex flex-row justify-between mb-10'>
            <div className='w-1/2 py-3 sm:px-5 px-[1px] rounded-md border border-gray6 bg-white '> 
                <input 
                type="text" 
                placeholder="Rechercher un projet" 
                className="sm:text-[16px]" 
                onChange={event => setSearchProject(event.target.value)} />   

            </div>
            <div> 
                <select 
                className="px-5 py-3 rounded-md text-gray1 font-medium border border-gray6" 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="all">Statuts</option>
                    <option value="En cour">En cours</option>
                    <option value="accepté">Accepté</option>
                    <option value="refusé">Refusé</option>
                </select>
            </div>
        </div>
        <div className="overflow-x-auto overflow-y-auto">
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
            {filterProjects(selectedStatus)?.map((project, index) => (
                <tr 
                key={index} 
                onClick={()=> handleClick(project)} 
                className="border-b bg-white font-meduim text-gray3 cursor-pointer">
                <th scope="row" className="px-6 py-4 font-medium text-gray1" >
                    {project.name}
                </th>
                <td className="px-6 py-4">
                    {project.owner}
                </td>
                <td className="px-6 py-4">
                    04/10/2023
                </td>
                <td className="px-6 py-4">
                    14/10/2023
                </td>
                <td className="px-6 py-4 text-primary ">
                    {project.status_reponse}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>

    </div>
  )
}
}
export default ComiteProjects