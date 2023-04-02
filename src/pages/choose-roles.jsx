import frContent from "../locale/fr.json"
import {RoleCard} from "../components/index.js";
import {ReactComponent as Enc} from '/src/assets/illustrations/encadrant.svg';
import {ReactComponent as Membre} from '/src/assets/illustrations/membre_cs.svg';
import {ReactComponent as Jury} from '/src/assets/illustrations/jury.svg';


const ChooseRole = () => {



const strings = frContent;
const {
  choose_roles_title,
  choose_roles_subtitle,
  choose_role_note,
  enc_desc,
  enc_title,
  jury_title,
  jury_desc,
  membre_title,
  membre_desc
} = frContent; 

    return (
        <div className="App font-eudox w-full md:h-screen flex flex-col justify-center items-center">
         <h1 className="text-xl sm:text-3xl text-center font-bold mt-12 w-3/4 md:mt-12">{choose_roles_title}</h1>
         <h4 className="text-xs sm:text-md text-center font-normal text-gray-500 mb-10 md:mb-14 mt-4">{choose_roles_subtitle}</h4>
         <div className="flex flex-col md:flex-row justify-center items-center gap-4">
         <RoleCard icon={<Enc/>} title={enc_title} description={enc_desc}/>
         <RoleCard icon={<Jury/>} title={jury_title} description={jury_desc}/>
         <RoleCard icon={<Membre/>} title={membre_title} description={membre_desc}/>
         </div>
         <button type="button" className="text-white font-semibold px-20 py-3 mt-14 bg-primary hover:bg-primary_focused rounded-md">Continuer</button>
         <h5 className="text-xs sm:text-sm font-normal text-gray-400 mb-8 md:mb-0 mt-4">{choose_role_note}</h5>
        </div>
      )
    }
export default ChooseRole