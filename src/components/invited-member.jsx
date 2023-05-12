import React from "react";
import { FiUserCheck } from "react-icons/fi";

const InvitedMember = ({ name }) => {
  return (
    <div className="bg-accent shadow-custom border flex items-center gap-3 rounded-[5px] px-5 py-2 mb-2">
      <FiUserCheck />
      <div>
        <p className="text-sm text-gray1 font-medium">{name}</p>
        <p className="text-xs text-gray3">Invitation envoyé</p>
      </div>
      <div></div>
    </div>
  );
};

export default InvitedMember;
