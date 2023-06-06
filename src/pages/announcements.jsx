import React from "react";
import Breadcrumbs from "../components/breadcrumbs";
import AnnouncementCard from "../components/announcement-card";

const Announcement = () => {
  return (
    <div>
      <Breadcrumbs />
      <div className="mb-10">
        <h1 className="text-2xl text-gray1 font-bold">
          Annonces Récentes
        </h1>
      </div>
      <div className="grid gap-x-4 gap-y-6 grid-cols-5">
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
    </div>
  );
};

export default Announcement;
