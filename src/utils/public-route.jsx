import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";


const PublicRoute = () => {
  let { user } = useContext(AuthContext);
  return (user ?  <Navigate to="/profile" /> : <Outlet/>);
};

export default PublicRoute;