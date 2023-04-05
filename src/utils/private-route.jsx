import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";


const PrivateRoute = () => {
  let { user } = useContext(AuthContext);
  return (!user ?  <Navigate to="/" /> : <Outlet/>);
};

export default PrivateRoute;