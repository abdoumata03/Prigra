import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";
const PhaseContext = createContext();

export default PhaseContext;

export const PhaseProvider = ({ children }) => {
  const [phases, setPhases] = useState(null);
  const [isPhasesLoading, setIsPhasesLoading] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("");
  const navigate = useNavigate();

  const fetch_phases = async () => {
    setIsPhasesLoading(true);

    const phasesResponse = await fetch(
      "https://prigra.onrender.com/diplome/phases/",
      {
        method: "GET",
        headers: {
          Authorization: `JWT ${
            JSON.parse(localStorage.getItem("authTokens")).access
          }`,
          "content-type": "application/json",
        },
      }
    );
    const phases_response_data = await phasesResponse.json();
    setPhases(phases_response_data);
    setIsPhasesLoading(false);

    const now_date = Date.now();
    phases_response_data?.forEach((element) => {
      if (
        now_date >= Date.parse(element.date_debut) &&
        now_date <= Date.parse(element.date_fin)
      ) {
        setCurrentPhase(element.nom_phase);
      }
    });
  };

  const putPhase = async (id, date_debut, date_fin) => {
    try {
      const phaseResponse = await fetch(
        `https://prigra.onrender.com/diplome/phases/${id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `JWT ${
              JSON.parse(localStorage.getItem("authTokens")).access
            }`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            date_debut,
            date_fin,
          }),
        }
      )
    if (phaseResponse.ok) {
      navigate(0);}
  } catch (error) {
    console.log(error);
  }
  };

  const contextData = {
    phases,
    isPhasesLoading,
    fetch_phases,
    putPhase,
    currentPhase,
  };

  return (
    <PhaseContext.Provider value={contextData}>
      {children}
    </PhaseContext.Provider>
  );
};
