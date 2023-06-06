import { FiChevronRight, FiHome } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  let currentPath = "";

  function getCrumbName(crumb) {
    switch (crumb) {
      case "project":
        if (!location.pathname.includes("soutenances")) {
          return "Mon Projet";
        } else {
          return "Projet";
        }
      case "edit":
        return "Modifier";
      case "profile":
        return "Mon Profile";
      case "annonces":
        return "Annonces";
      case "commite-projects":
        return "Projets";
      case "encadrement":
        return "Encadrement";
      case "stats":
        return "Statistiques";
      case "soutenances":
        return "Soutenances";
      case "jury":
        return "Délibiration";
      case "deliberation":
        return "Ma déliberation";
      case crumb:
        if (location.pathname.includes("commite") && !isNaN(crumb)) {
          return "Détails du Projet";
        } else if (location.pathname.includes("soutenances/project")) {
          return "Plannifier";
        }
        break;
    }
  }

  const filtered_crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .filter((crumb, index, crumbs) => {
      if (
        crumb === "project" &&
        index < crumbs.length - 1 &&
        crumbs[index - 1] === "soutenances"
      ) {
        return false; // Ignore "project" when followed by "soutenances"
      }
      return true;
    });

  const crumbs = filtered_crumbs.map((crumb, i) => {
    currentPath += `/${crumb}`;
    return (
      <div className="flex items-center" key={crumb}>
        <NavLink
          className={`text-base font-medium ${
            i === filtered_crumbs.length - 1 && filtered_crumbs.length !== 1
              ? "font-bold rounded-[0.4rem] "
              : "text-gray3 font-normal"
          } text-gray1 py-2 px-5`}
          to={currentPath}
        >
          {getCrumbName(crumb)}
        </NavLink>
        {i !== filtered_crumbs.length - 1 && (
          <div className="text-gray3">
            <FiChevronRight />
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="flex mb-10 w-fit flex-row border bg-white shadow-custom px-[0.3rem] py-[0.3rem] rounded-[8px]">
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;
