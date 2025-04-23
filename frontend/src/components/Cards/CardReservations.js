import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
//import { getAllCars, deleteCarById } from "../../services/ApiCar";

export default function CardVoiture({ color }) {
  const [Cars, setCars] = useState([]);

/*   const getcars = async () => {
    try {
      const res = await getAllCars();
      console.log("data");
      setCars(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCar = async (id) => {
    try {
      await deleteCarById(id);
      getcars();
    } catch (error) {
      console.log(error);
    }
  }; */

 /*  useEffect(() => {
    getcars();
  }, []); */

  return (
    <>



      <div
        className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${color === "light" ? "bg-white" : "bg-lightBlue-900 text-white"
          }`}
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={`font-semibold text-lg ${color === "light" ? "text-blueGray-700" : "text-white"
                  }`}
              >
                Liste des Reservations
              </h3>
            </div>
            <div><Link to="/admin/AddVoiture">
              <button className="bg-green-500 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md">
                ➕ Ajouter
              </button>
            </Link></div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Cin</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Immatricule</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Date Reservation</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Date Prise en Charge</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Date Retour</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Status
                    <select className="bg-white border border-black rounded px-8 py-1 text-xs text-black">
                        <option value="Confirmée">Confirmée</option>
                        <option value="Annulée">Annulée</option>
                        <option value="En Cours">En Cours</option>
                        <option value="Terminée">Terminée</option>
                    </select>
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase">CreatedAt</th>
                <th className="px-6 py-3 text-xs uppercase font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
  {Cars.length === 0 ? (
    <tr>
      <td colSpan="5" className="text-center py-4 text-gray-500">
        Aucune voiture trouvée.
      </td>
    </tr>
  ) : (
    Cars.map((car, index) => (
      <tr key={index}>
        <td className="px-6 py-4 text-sm">{car.model}</td>
        <td className="px-6 py-4 text-sm">{car.matricule}</td>
        <td className="px-6 py-4 text-sm">{car.prix}</td>
        <td className="px-6 py-4 text-sm">{car.createdAt}</td>
        <td className="px-6 py-4 text-sm">
          <div className="flex gap-2 justify-center">
          <Link to={`/admin/UpdateVoiture/${car._id}`}>
              <button className="text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md">
                ✏️ Modifier
              </button>
            </Link>
            {/* <button
              className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded"
              onClick={() => {
                if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
                  deleteCar(car._id);
                }
              }}
            >
              🗑️ Supprimer
            </button> */}
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

          </table>
        </div>
      </div>
    </>
  );
}

CardVoiture.defaultProps = {
  color: "light",
};

CardVoiture.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};