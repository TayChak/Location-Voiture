import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllAgences, deleteAgenceById } from "../../services/ApiAgence";

export default function CardAgence({ color }) {
  const [agences, setAgences] = useState([]);

  const getAgences = async () => {
    try {
      const res = await getAllAgences();
      setAgences(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAgence = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette agence ?");
    if (confirmDelete) {
      try {
        await deleteAgenceById(id);
        getAgences();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAgences();
  }, []);

  return (
    <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
      (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className={"font-semibold text-lg " +
              (color === "light" ? "text-blueGray-700" : "text-white")}>
              Liste des Agences
            </h3>
          </div>
          <div className="w-full text-right">
            <Link to="/admin/AddAgence">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2 rounded-full shadow-md">
                + Ajouter Agence
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" :
                  "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")}>
                Nom
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" :
                  "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")}>
                Ville
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" :
                  "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")}>
                Local
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" :
                  "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")}>
                Code Postal
              </th>
              <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" :
                  "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {agences.map((agence, index) => (
              <tr key={index}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  {agence.Nom}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {agence.ville}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {agence.local}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {agence.codePostal}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex justify-center items-center gap-3">
                    <Link to={`/admin/update-agence/${agence._id}`}>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md">
                        ✏️ Modifier
                      </button>
                    </Link>
                    <Link to={`/admin/AddAdmin/${agence._id}`}>
                      <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md">
                        🔑 Ajouter Admin
                      </button>
                    </Link>

                    <button className="bg-red-500 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md"
                      onClick={() => deleteAgence(agence._id)}>
                      🗑️ Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CardAgence.defaultProps = {
  color: "light",
};

CardAgence.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};