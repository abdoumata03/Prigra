import { FiChevronRight, FiHome } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  let currentPath = "";

  function getCrumbName(crumb) {
    if (crumb === "project") {
      return "Mon Projet";
    } else if (crumb === "edit") {
      return "Modifier";
    } else if (crumb === "profile") {
      return "Mon Profile";
    } else if (crumb === "annonces") {
      return "Annonces";
    } else if (crumb === "commite-projects") {
      return "Projets";
    } else if (location.pathname.includes("commite") && !isNaN(crumb))
      return "Détails du Projet";
    else if (crumb === "encadrement") return "Encadrement";
    else if (crumb === "stats") {
      return "Statistiques";
    }
  }

  const filtered_crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "");

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
