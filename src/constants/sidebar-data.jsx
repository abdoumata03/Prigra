import {
  FiBriefcase,
  FiClipboard,
  FiLogOut,
  FiUser,
  FiCalendar,
  FiVolume1,
} from "react-icons/fi";

export const StudentSidebarData = [
  {
    title: "Mon profile",
    icon: <FiUser />,
    link: "/profile",
  },
  {
    title: "Mon projet",
    icon: <FiClipboard />,
    link: "/project",
  },
  {
    title: "Soutenance",
    icon: <FiBriefcase />,
    link: "/soutenance",
  },
  {
    title: "Annonces",
    icon: <FiVolume1 />,
    link: "/annonces",
  },
];

export const TeacherSidebarData = [
  {
    title: "Mon Profile",
    icon: <FiUser />,
    link: "/profile",
  },
  {
    title: "Les Projet",
    icon: <FiClipboard />,
    link: "/commite-projects",
  },
  {
    title: "Annonces",
    icon: <FiVolume1 />,
    link: "/annonces",
  },
  {
    title: "Phases",
    icon: <FiCalendar />,
    link: "/date-planification",
  },
];

export const LogoutData = [
  {
    title: "Se déconnecter",
    icon: <FiLogOut />,
  },
];
