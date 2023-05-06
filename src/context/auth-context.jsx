import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

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

  // If Email is Verified
  const [isEmailActivated, setIsEmailActivated] = useState(true);

  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(
    false
  );

  // User Profile Data
  const [userData, setUserData] = useState(null);

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

      setisFetching(false);

      const token_data = await auth_token_response.json();

      if (auth_token_response.status === 200) {
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
        const user_id = me_data.type_id;

        const fetch_user_type = await fetch(
          `https://prigra.onrender.com/base/${user_type}/${user_id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token_data.access}`,
            },
          }
        );

        const user_type_data = await fetch_user_type.json();

        setUserData(user_type_data);

        console.log(user_type_data);

        setAuthTokens(token_data);
        setUser(jwt_decode(token_data.access));
        localStorage.setItem("authTokens", JSON.stringify(token_data));

        // navigate("/roles");
      } else {
        alert("Informations érronés!");
      }
    } catch (error) {
      console.log(error);
      setisFetching(false);
    }
  };
  //SignUp Function
  const signupUser = async (email, password, first_name, last_name, type) => {
    setisFetching(true);

    try {
      const auth_token_response = await fetch(
        "https://prigra.onrender.com/auth/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            first_name,
            last_name,
            type,
          }),
        }
      );

      const token_data = await auth_token_response.json();

      if (auth_token_response.ok) {
        navigate("/verify-email");
      } else {
        alert("could not sign up");
      }
    } catch (error) {
      console.log(error);
      setisFetching(false);
    }
  };

  const completeStudentRegistration = async (
    id,
    num_inscription,
    birth_date,
    phone_number,
    etablissment,
    filière,
    spécialité,
    profile_picture
  ) => {
    setisFetching(true);

    try {
      const registration_response = await fetch(
        `https://prigra.onrender.com/base/Student/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            num_inscription,
            birth_date,
            phone_number,
            etablissment,
            filière,
            spécialité,
            profile_picture,
          }),
        }
      );

      if (registration_response.ok) {
        navigate("/registration-success");
      }
    } catch (error) {
      console.log(error);
      setisFetching(false);
    }

    setisFetching(false);
  };

  const completeTeacherRegistration = async (
    id,
    matricule,
    birth_date,
    phone_number,
    etablissment,
    grade,
    spécialité,
    profile_picture
  ) => {
    setisFetching(true);

    try {
      const registration_response = await fetch(
        `https://prigra.onrender.com/base/Teacher/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matricule,
            birth_date,
            phone_number,
            etablissment,
            grade,
            spécialité,
            profile_picture,
          }),
        }
      );

      if (registration_response.ok) {
        navigate("/registration-success");
      }
    } catch (error) {
      console.log(error);
      setisFetching(false);
    }
    setisFetching(false);
  };

  //activate email
  const activateEmail = async (uid, token) => {
    setisFetching(true);

    try {
      const registration_response = await fetch(
        "https://prigra.onrender.com/auth/users/activation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid,
            token,
          }),
        }
      );

      if (registration_response.status === 204) {
        setIsEmailActivated(true);
      } else if (registration_response.status === 403) {
        alert("Lien expiré!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //forgot pass
  const forgotPassword = async (email) => {
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
            "content-type": "application/json",
          },
        }
      );
      if (reset_response.status === 204) {
        setIsValidEmail(true);
      } else if (reset_response.status === 400) {
        alert("Cet email n'existe pas");
      }
    } catch (error) {
      console.log(error);
      setisFetching(false);
    }
    setisFetching(false);
  };
  //reset pass
  const resetPassword = async (uid, token, new_password) => {
    setisFetching(true);
    try {
      const reset_pass_resp = await fetch(
        `https://prigra.onrender.com/auth/users/reset_password_confirm/`,
        {
          method: "POST",
          body: JSON.stringify({
            uid,
            token,
            new_password,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (reset_pass_resp.status === 204) {
        setIsResetSuccess(true);
      }
    } catch (error) {
      console.log(error);
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
    resetPassword,
    isResetSuccess,
    isFetching,
    userData,
    completeStudentRegistration,
    completeTeacherRegistration,
    forgotPassword,
    setAuthTokens,
    loginUser,
    logoutUser,
    signupUser,
    isEmailActivated,
    isRegistrationSuccessful,
    activateEmail,
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
