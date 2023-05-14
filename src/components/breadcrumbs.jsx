import { FiChevronRight, FiHome } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  let currentPath = "";

  function getCrumbName(crumb) {
    if (crumb === "project") {
      return "Mon Projet";
    } else if (crumb === "add") {
      return "Créer";
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
              ? "font-bold rounded-[5px] "
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
    <div className="flex mb-10 flex-row border bg-white shadow-custom px-[0.3rem] py-[0.3rem] rounded-[8px]">
      {crumbs}
    </div>
  );
};

export default Breadcrumbs;
