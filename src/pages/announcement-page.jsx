import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router";

const AnnouncementPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white rounded-[5px] px-10 py-12 shadow-custom flex flex-col">
      <button onClick={() => navigate(-1)}>
        <div className="flex items-center gap-3 mb-8 text-primary">
          <FiChevronLeft />
          <p>Tous les annonces</p>
        </div>
      </button>
      <h1 className="text-3xl font-medium w-4/5 text-gray1 mb-3">
        Training workshops for project leaders concerned by Ministerial Order
        1275
      </h1>
      <p className="text-sm mb-12 text-gray3">JUIN 25, 2023</p>
      <a href="#" className="flex justify-center items-center mb-12">
        <img
          class="rounded-[5px] w-4/5"
          src="https://flowbite.com/docs/images/blog/image-1.jpg"
          alt=""
        />
      </a>
      <p className="px-10">
        Le Comité National de Coordination du Suivi de l’Innovation et de
        l’Entrepreneuriat Universitaire organise, le 14 et 15 mai 2023, des
        ateliers de formation des porteurs de projets concernés par l’Arrêté
        Ministériel 1275, au niveau de la bibliothèque Centrale de Universitaire
        de Sidi Bel Abbes. Par ailleurs, nous vous informons également les
        porteurs de projet que des séances d’évaluation de l’état l’avancement
        des projets seront organisées le 16 et 17 mai 2023, en présence des
        membres de la cellule locale de travail et de suivi au niveau de
        l’incubateur de l’école.
      </p>
      <hr className="my-8 w-3/5 self-center"/>
      <div></div>
    </div>
  );
};

export default AnnouncementPage;
