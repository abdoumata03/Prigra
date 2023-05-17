import React from "react";
import { FiClock, FiMapPin } from "react-icons/fi";

const AnnouncementCard = () => {
  return (
    <div class="max-w-[300px] bg-white border border-gray-200 rounded-[5px] shadow-custom">
      <a className="" href="#">
        <img
          class="object-cover rounded-t-[5px] h-48 w-96"
          src="https://www.esi-sba.dz/fr/wp-content/uploads/2023/05/20230514_135844.jpg"
          alt=""
        />
      </a>
      <div class="px-8 py-6 flex gap-8">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-primary font-regular text-sm">SEP</p>
          <p className="text-gray1 text-lg font-bold">15</p>
        </div>
        <div>
          <a href="#">
            <h5 class="mb-2 text-[0.9rem] font-medium tracking-tight text-gray1">
              Training workshops for project leaders concerned by Ministerial
              Order 1275
            </h5>
          </a>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center text-gray3 mt-4">
              <FiClock />
              <p className="text-xs text-gray3">08:00 - 16:00</p>
            </div>
            <div className="flex gap-3 items-center text-gray3">
              <FiMapPin />
              <p className="text-xs text-gray3">Central libary</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
