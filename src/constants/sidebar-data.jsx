import { ReactComponent as Profile } from "../assets/icons/profile.svg";
import { ReactComponent as Project } from "../assets/icons/project.svg";
import { ReactComponent as Annonces } from "../assets/icons/annonces.svg";
import { ReactComponent as Soutenance } from "../assets/icons/soutenance.svg";
import { ReactComponent as Logout } from "../assets/icons/logout.svg";
<<<<<<< HEAD
import { FiBriefcase, FiClipboard, FiLogOut, FiUser, FiVolume1 } from "react-icons/fi";
=======
import { ReactComponent as Dates } from "../assets/icons/Calendar.svg";
>>>>>>> comiteInterfaces



export const StudentSidebarData = [
    {   
        title: "Mon profile",
        icon: <FiUser/>,
        link: "/profile"
    }, 
    {
        title: "Mon projet",
        icon: <FiClipboard/>,
        link: "/project"
    },
    {
        title: "Soutenance",
        icon: <FiBriefcase/>,
        link: "/soutenance"
    },
    {
        title: "Annonces",
        icon: <FiVolume1/>,
        link: "/annonces"
    },
];

export const TeacherSidebarData = [
    {
        title: "Mon Profile",
        icon: <Profile/>,
        link: "/profile"

    }, 
    {
        title: "Les Projet",
        icon: <Project/>,
        link : '/comite-projects'
    },
    {
        title: "Annonces",
        icon: <Annonces/>,
        link: "/annonces"

    }, 
    {
        title: 'Phases', 
        icon : <Dates/>, 
        link :'/date-planification', 

    }
];

export const LogoutData = [
    {
       title: "Se déconnecter",
       icon: <FiLogOut/> 
    }
]