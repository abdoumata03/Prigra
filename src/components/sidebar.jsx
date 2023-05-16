import React, { useContext, useState } from "react";
import { logo } from "../assets";
import { StudentSidebarData } from "../constants/sidebar-data";
import { TeacherSidebarData } from "../constants/sidebar-data";
import { LogoutData } from "../constants/sidebar-data";
import { NavLink, useLocation } from "react-router-dom";
import AuthContext from "../context/auth-context";
import BlueLoadingSpinner from "./spinner_blue";
import ProfileContext from "../context/profile-context";

const Sidebar = () => {
  const { logoutUser } = useContext(AuthContext);

  const { userData, isLoading, userInitialData } = useContext(ProfileContext);

  const location = useLocation();

  const [selectedItemIndex, setSelectedItemIndex] = useState(
    StudentSidebarData.findIndex((item) =>
      location.pathname.includes(item.link)
    )
  );

  const isStudent = userInitialData?.type == "Student";

  const SidebarData = isStudent ? StudentSidebarData : TeacherSidebarData;

  if (isLoading) {
    return (
      <div className="flex bg-white justify-center items-center py-10 w-1/5 ">
        <BlueLoadingSpinner />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col border-r border-gray-200 justify-start fixed h-screen z-10 items-center py-10 w-[18%] bg-white shadow-custom">
        <img src={logo} alt="logo" className="mb-14 w-1/3" />
        {/* <div className="flex flex-col items-center justify-center mb-5"> */}
          {/* <img
            src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
            alt="Avatar Picture"
            className="w-[70px] h-[70px] rounded-full mb-6"
          /> */}
          {/* <h1 className="font-semibold text-gray1 text-center hidden md:block">
            {userData?.first_name + " " + userData?.last_name}
          </h1>
          <p className="text-sm text-gray3 mb-8 text-center hidden md:block">
            {userData?.email.split("@").shift()}
          </p> */}
        {/* </div> */}
        {/* <p className="text-center text-xs w-3/4 text-gray3 mb-12">
          École Supérieure en Informatique 08-Mai-1945 Sidi Bel Abbès
        </p> */}
        <ul className=" flex-1 w-full">
          {SidebarData.map((val, index) => (
            <NavLink to={val.link} key={index} activeclassname="active">
              <button
                key={index}
                className={`rounded-[5px] mb-2 w-full py-4 md:py-2 pl-10 ${
                  selectedItemIndex === index
                    ? "hover:bg-none border-r-2 border-primary rounded-r-none"
                    : "hover:bg-accent"
                } `}
                onClick={() => setSelectedItemIndex(index)}
              >
                <li
                  className={`flex flex-row gap-7 items-center justify-center md:justify-start ${
                    selectedItemIndex === index ? `text-primary` : `text-gray1`
                  } `}
                >
                  <div>{val.icon}</div>
                  <div
                    className={`hidden md:block truncate ${
                      selectedItemIndex === index
                        ? "text-gray1 font-medium"
                        : "text-gray3"
                    } text-base`}
                  >
                    {val.title}
                  </div>
                </li>
              </button>
            </NavLink>
          ))}
        </ul>
        <ul className="self-start pl-10 justify-self-end">
          {LogoutData.map((val, index) => (
            <button key={index} onClick={() => logoutUser()}>
              <li className="flex flex-row items-center justify-center gap-4 mb-5 text-gray3">
                <div>{val.icon}</div>
                <div className="hidden md:block">{val.title}</div>
              </li>
            </button>
          ))}
        </ul>
      </div>
    );
  }
};

export default Sidebar;
