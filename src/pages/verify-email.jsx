import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Mail } from "../assets/illustrations/mail_sent.svg";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const etu = location.state;

  const handleClick = () => {
    navigate("/fill-infos", { state: { data: etu } });
  };

  return (
      <div className="flex w-full h-screen items-center justify-center font-eudox bg-gray-50">
        <div className="w-4/5 md:w-2/5 h-auto flex flex-col items-center justify-center bg-white shadow-custom rounded-[5px] px-10 py-[48px]">
          <div className="bg-accent p-4 w-[120px] h-[120px] rounded-md flex items-center justify-center mb-5">
            <Mail width="65x" height="58px" />
          </div>
          <h1 className="text-2xl mb-8 font-bold text-gray1 text-center">
            Vérifiez votre boite e-mail
          </h1>
          <p className="text-sm text-gray2 text-center mb-4">
            Vous allez recevoir une notification dans votre boîte email pour
            valider votre inscription et compléter le reste de vos informations.
          </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
