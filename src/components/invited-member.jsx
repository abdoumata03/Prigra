import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const InvitedMember = ({ name }) => {
  return (
    <div className="bg-accent shadow-custom border flex items-center gap-3 rounded-[0.4rem] px-5 py-2 mb-2">
      <FiArrowUpRight />
      <div>
        <p className="text-sm text-gray1 font-medium">{name}</p>
        <p className="text-xs text-gray3">Invitation envoyé</p>
      </div>
    </div>
  );
};

export default InvitedMember;
