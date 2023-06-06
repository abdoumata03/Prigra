import {
  FiBriefcase,
  FiClipboard,
  FiLogOut,
  FiUser,
  FiCalendar,
  FiVolume1,
  FiUsers,
  FiAward,
  FiActivity,
} from "react-icons/fi";

export const PdpSidebarData = [
  {
    id: "profile",
    title: "Mon profile",
    icon: <FiUser />,
    link: "/profile",
  },
  {
    id: "project",
    title: "Mon projet",
    icon: <FiClipboard />,
    link: "/project",
  },
  {
    id: "soutenance",
    title: "Soutenance",
    icon: <FiAward />,
    link: "/soutenances",
  },
  {
    id: "annonces",
    title: "Annonces",
    icon: <FiVolume1 />,
    link: "/annonces",
  },
];

export const AtsSidebarData = [
  {
    id: "profile",
    title: "Mon profile",
    icon: <FiUser />,
    link: "/profile",
  },
  {
    id: "soutenance",
    title: "Soutenance",
    icon: <FiAward />,
    link: "/soutenances",
  },
];

export const TeacherSidebarData = [
  {
    id: "profile",
    title: "Mon Profile",
    icon: <FiUser />,
    link: "/profile",
  },
  {
    id: "commite",
    title: "Les Projets",
    icon: <FiClipboard />,
    link: "/commite-projects",
  },
  {
    id: "stats",
    title: "Statistique",
    icon: <FiActivity />,
    link: "/stats",
  },
  {
    id: "annonces",
    title: "Annonces",
    icon: <FiVolume1 />,
    link: "/annonces",
  },
  {
    id: "date-planification",
    title: "Phases",
    icon: <FiCalendar />,
    link: "/date-planification",
  },
];
export const TeacherEncadrantSidebarData = [
  {
    id: "profile",
    title: "Mon Profile",
    icon: <FiUser />,
    link: "/profile",
  },
  {
    id: "encadrement",
    title: "Encadrement",
    icon: <FiUsers />,
    link: "/encadrement",
  },
];

export const TeacherEncadrantJurySidebarData = [
  {
    id: "profile",
    title: "Mon Profile",
    icon: <FiUser />,
    link: "/profile",
  },
  {
    id: "encadrement",
    title: "Encadrement",
    icon: <FiUsers />,
    link: "/encadrement",
  },
  {
    id: "jury",
    title: "Délibiration",
    icon: <FiAward />,
    link: "/jury",
  },
];

export const LogoutData = [
  {
    title: "Se déconnecter",
    icon: <FiLogOut />,
  },
];
