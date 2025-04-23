import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllUsers, deleteUserById } from "../../services/ApiUser";

export default function CardUser({ color }) {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    console.log("data");
    try {
      await getAllUsers().then((res) => {
        setUsers(res.data.userListe);


      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (id) => {
    try {
      await deleteUserById(id);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div
        className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${color === "light" ? "bg-white" : "bg-lightBlue-900 text-white"}`}
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={`font-semibold text-lg ${color === "light" ? "text-blueGray-700" : "text-white"}`}
              >
                user Tables
              </h3>
            </div>
            <div>
              <button className="bg-green-500 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md">
                ➕ Ajouter
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`}
                >
                  FirstName
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`}
                >
                  LastName
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`}
                >
                  Email
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`}
                >
                  CreatedAt
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ${color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"}`}
                ></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (

                <tr >
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">

                    <span
                      className={`ml-3 font-bold ${color === "light" ? "text-blueGray-600" : "text-white"}`}
                    >
                      {user.username}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.username}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-orange-500 mr-2"></i>
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.createdAt}
                  </td>
                  <td>

                    <button className="text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md">
                      ✏️ Modifier
                    </button>

                    <button
                      className="text-white font-semibold text-sm px-4 py-2 rounded-full shadow-md"

                      type="button"
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    >
                      🗑️ Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardUser.defaultProps = {
  color: "light",
};

CardUser.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
