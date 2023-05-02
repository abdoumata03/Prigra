import { ReactComponent as Profile } from "../assets/icons/profile.svg";
import { ReactComponent as Project } from "../assets/icons/project.svg";
import { ReactComponent as Annonces } from "../assets/icons/annonces.svg";
import { ReactComponent as Soutenance } from "../assets/icons/soutenance.svg";
import { ReactComponent as Logout } from "../assets/icons/logout.svg";



export const StudentSidebarData = [
    {   
        title: "Mon Profile",
        icon: <Profile/>,
        link: "/profile"
    }, 
    {
        title: "Mon Projet",
        icon: <Project/>,
        link: "/project"
    },
    {
        title: "Soutenance",
        icon: <Soutenance/>,
        link: "/soutenance"
    },
    {
        title: "Annonces",
        icon: <Annonces/>,
        link: "/annonces"
    },
];

export const TeacherSidebarData = [
    {
        title: "Mon Profile",
        icon: <Profile/>,
    }, 
    {
        title: "Mes Projet",
        icon: <Project/>,
    },
    {
        title: "Annonces",
        icon: <Annonces/>,
    }
];

export const LogoutData = [
    {
       title: "Logout",
       icon: <Logout/> 
    }
]