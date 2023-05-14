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

  const {userData, isLoading, userInitialData} = useContext(ProfileContext);
  
  const location = useLocation();

  const [selectedItemIndex, setSelectedItemIndex] = useState(
    StudentSidebarData.findIndex((item) => item.link == location.pathname)
  );

  const isStudent = (userInitialData?.type == 'Student'); 

  const SidebarData = isStudent ? StudentSidebarData: TeacherSidebarData; 

  if (isLoading) {
    return (
      <div className="flex bg-white justify-center items-center py-10 w-1/5 ">
        <BlueLoadingSpinner />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-start items-center py-10 w-1/5 bg-white">
        <img src={logo} alt="logo" className="mb-14 w-1/3" />
        <div className="flex flex-col items-center justify-center mb-5">
          <img
            src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
            alt="Avatar Picture"
            className="w-[80px] h-[80px] rounded-full mb-4"
          />
          <h1 className="font-semibold text-gray1 text-center hidden md:block">
            {userData?.first_name + " " + userData?.last_name}
          </h1>
          <p className="text-sm text-gray3 mb-8 text-center hidden md:block">
            {userData?.email}
          </p>
        </div>
        {/* <p className="text-center text-xs w-3/4 text-gray3 mb-12">
        École Supérieure en Informatique 08-Mai-1945 Sidi Bel Abbès
      </p> */}
        <ul className="self-center flex-1 w-4/5">
          {SidebarData.map((val, index) => (
            <NavLink to={val.link} key={index} activeclassname="active">
              <button
                key={index}
                className={`${
                  selectedItemIndex === index ? `bg-primary` : `bg-none`
                } rounded-[5px] mb-2 w-full py-4 md:py-2 px-5 ${
                  selectedItemIndex === index
                    ? "hover:bg-none"
                    : "hover:bg-gray5"
                } `}
                onClick={() => setSelectedItemIndex(index)}
              >
                <li
                  className={`flex flex-row gap-4 items-center justify-center md:justify-start ${
                    selectedItemIndex === index ? `text-white` : `text-gray1`
                  } `}
                >
                  <div>
                    {React.cloneElement(val.icon, {
                      fill: selectedItemIndex === index ? "white" : "#333333",
                    })}
                  </div>
                  <div className="hidden md:block truncate">{val.title}</div>
                </li>
              </button>
            </NavLink>
          ))}
        </ul>
        <ul className="self-start pl-10 justify-self-end">
          {LogoutData.map((val, index) => (
            <button key={index} onClick={() => logoutUser()}>
              <li className="flex flex-row items-center justify-center gap-4 mb-5 text-gray1">
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
