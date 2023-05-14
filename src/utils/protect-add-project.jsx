import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import ProfileContext from "../context/profile-context";


const ProtectedProject = () => {
  const { hasProject } = useContext(ProfileContext);
  return (!hasProject ?  <Navigate to="/project" /> : <Outlet/>);
};

export default ProtectedProject;