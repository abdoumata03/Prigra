import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // Token State
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  // User State
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  // Loading Bool
  const [loading, setLoading] = useState(true);

  // isFetching Bool
  const [isFetching, setisFetching] = useState(false);

  // Error Message
  const [errorMsg, setErrorMsg] = useState(null);
  
  // If Reset Email is Valid
  const [isValidEmail, setIsValidEmail] = useState(false);

  // If password Reset is Successful
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  // RRv6 Navigator
  const navigate = useNavigate();

  //Login Function
  const loginUser = async (email, password) => {
    setisFetching(true);
    try {
      const auth_token_response = await fetch(
        "https://prigra.onrender.com/auth/jwt/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const token_data = await auth_token_response.json();

      if (auth_token_response.status === 200) {
        setAuthTokens(token_data);
        setUser(jwt_decode(token_data.access));
        localStorage.setItem("authTokens", JSON.stringify(token_data));

        const response_me = await fetch(
          "https://prigra.onrender.com/auth/users/me/",
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token_data.access}`,
            },
          }
        );

        const me_data = await response_me.json();
        const user_type = me_data.type;
        const user_id = me_data.id;

        const fetch_user_type = await fetch(
          `https://prigra.onrender.com/base/${user_type}/${user_id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token_data.access}`,
            },
          }
        );

        navigate("/roles");
      } else {
        alert("Mot de pass erroné!");
      }
    } catch (error) {
      console.log(error);
      setisFetching(false);
    }
  };

  const resetPassword = async (email) => {
    setisFetching(true);
    try {
      const reset_response = await fetch(
        `https://prigra.onrender.com/auth/users/reset_password/`,
        {
          method: "POST",
          body: JSON.stringify({
            email,
          }),
          headers: {
            'content-type': 'application/json'
          }
        }
      );
      if (reset_response.status === 204) {
         alert("Cet email n'existe pas!");
      } else if(reset_response.status === 500) {
        setIsValidEmail(true);
      }
    } catch (error) {
      console.log(error)
      setisFetching(false);
    }
    setisFetching(false);
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const contextData = {
    user,
    setUser,
    errorMsg,
    authTokens,
    isValidEmail,
    isResetSuccess,
    isFetching,
    resetPassword,
    setAuthTokens,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
