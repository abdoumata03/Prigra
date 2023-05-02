import React, { useContext, useState } from "react";
import { logo } from "../assets";
import { StudentSidebarData } from "../constants/sidebar-data";
import { TeacherSidebarData } from "../constants/sidebar-data";
import { LogoutData } from "../constants/sidebar-data";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/auth-context";

const Sidebar = () => {
  const { logoutUser } = useContext(AuthContext);

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return (
    <div className="flex flex-col justify-start items-center py-10 w-1/5 bg-white">
      <img src={logo} alt="logo" className="mb-14 w-[100px]" />
      <div className="flex flex-col items-center justify-center mb-5">
        <img
          src="https://i.ibb.co/T1r9Mzc/1679220246331.jpg"
          alt="Avatar Picture"
          className="w-[80px] h-[80px] rounded-full mb-4"
        />
        <h1 className="font-semibold text-gray1">MATALLAH Abdallah</h1>
        <p className="text-sm text-gray3 mb-8">a.matallah@esi-sba.dz</p>
      </div>
      {/* <p className="text-center text-xs w-3/4 text-gray3 mb-12">
        École Supérieure en Informatique 08-Mai-1945 Sidi Bel Abbès
      </p> */}
      <ul className="self-center flex-1 w-4/5">
        {StudentSidebarData.map((val, index) => (
          <NavLink to={val.link} activeclassname="active">
            <button
              key={index}
              className={`${
                selectedItemIndex === index ? `bg-primary` : `bg-none`
              } rounded-[5px] mb-2 w-full py-2 px-5 ${
                selectedItemIndex === index ? "hover:bg-none" : "hover:bg-gray5"
              } `}
              onClick={() => setSelectedItemIndex(index)}
            >
              <li
                className={`flex flex-row gap-4 items-center ${
                  selectedItemIndex === index ? `text-white` : `text-gray1`
                } `}
              >
                <div>
                  {React.cloneElement(val.icon, {
                    fill: selectedItemIndex === index ? "white" : "#333333",
                  })}
                </div>
                <div>{val.title}</div>
              </li>
            </button>
          </NavLink>
        ))}
      </ul>
      <ul className="self-start pl-10 justify-self-end">
        {LogoutData.map((val, index) => (
          <button key={index} onClick={() => logoutUser()}>
            <li className="flex flex-row items-center gap-4 mb-5 text-gray1">
              <div>{val.icon}</div>
              <div>{val.title}</div>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
