import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";


const PrivateLogin = () => {
  let { user } = useContext(AuthContext);
  return (user ?  <Navigate to="/roles" /> : <Outlet/>);
};

export default PrivateLogin;