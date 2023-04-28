import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useNavigate();

  const loginUser = async (email, password) => {
    const response = await fetch(
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

    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));

      const response_me = await fetch(
        "https://prigra.onrender.com/auth/users/me/",
        {
          method: "GET",
          headers: {
            Authorization: `JWT ${data.access}`,
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
            Authorization: `JWT ${data.access}`,
          },
        }
      );

      history("/roles");
    } else {
      alert("Mot de pass erroné!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
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
