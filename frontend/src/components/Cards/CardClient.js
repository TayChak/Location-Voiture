import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllClients,deleteClientById } from "../../services/ApiClient";

export default function CardClient({ color }) {
  const [Clients, setClients] = useState([]);

  const getClient = async () => {
    try {
      const res = await getAllClients();
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClient = async (id) => {
    try {
      await deleteClientById(id);
      getClient(); 
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };
  
  useEffect(() => {
    getClient();
  }, []);

  return (
    <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
      (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")}>
      
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className={"font-semibold text-lg " +
              (color === "light" ? "text-blueGray-700" : "text-white")}>
              Table des Clients
            </h3>
          </div>
        </div>
      </div>

      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">CIN</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Nom & Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">E-mail</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Date de naissance</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Adresse</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Clients.map((client) => (
              <tr key={client._id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4">
                  {client.Cin}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4">
                  {client.Nom} {client.Prenom}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4">
                  {client.email}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4">
                  {client.Telephone}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4">
                  {client.DateNaissance}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4">
                  {client.Adresse}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link to={`/admin/update-client/${client._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-3 rounded">
                        ✏️ Modifier
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded"
                      onClick={() => deleteClient(client._id)}>
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

CardClient.defaultProps = {
  color: "light",
};

CardClient.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};