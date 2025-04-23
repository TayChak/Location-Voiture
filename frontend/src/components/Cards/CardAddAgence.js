import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addagence } from "../../services/ApiAgence";

export default function CardAddAgence() {
  const history = useHistory();
  const [newAgence, setNewAgence] = useState({
    Nom: "",
    ville: "",
    codePostal: "",
    local: "",
    username: "",
    email: "",
    password: "",
    age: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAgence({ ...newAgence, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs requis
    let formErrors = {};
    if (!newAgence.Nom.trim()) formErrors.Nom = "Nom requis";
    if (!newAgence.ville.trim()) formErrors.ville = "Ville requise";
    if (!newAgence.codePostal.trim()) formErrors.codePostal = "Code postal requis";
    if (!newAgence.username.trim()) formErrors.username = "Nom d'utilisateur requis";
    if (!newAgence.email.trim()) formErrors.email = "Email requis";
    if (!newAgence.password.trim()) formErrors.password = "Mot de passe requis";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await addagence(newAgence);
      history.push("/admin/Agence");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'agence:", error);
      
      // Gestion des erreurs du serveur
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || "Erreur lors de l'ajout de l'agence");
      }
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Ajouter une agence</h6>
          <button
            className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md"
            type="button"
            onClick={() => history.push("/admin/agences")}
          >
            Retour
          </button>
        </div>
      </div>

      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informations agence
          </h6>

          <div className="flex flex-wrap">
            {/* Nom Agence */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nom Agence
                </label>
                <input
                  type="text"
                  name="Nom"
                  value={newAgence.Nom}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.Nom ? "border border-red-500" : ""
                  }`}
                  placeholder="Nom de l'agence"
                />
                {errors.Nom && <p className="text-red-500 text-xs italic mt-1">{errors.Nom}</p>}
              </div>
            </div>

            {/* Ville */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  name="ville"
                  value={newAgence.ville}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.ville ? "border border-red-500" : ""
                  }`}
                  placeholder="Ville"
                />
                {errors.ville && <p className="text-red-500 text-xs italic mt-1">{errors.ville}</p>}
              </div>
            </div>

            {/* Code Postal */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Code Postal
                </label>
                <input
                  type="text"
                  name="codePostal"
                  value={newAgence.codePostal}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.codePostal ? "border border-red-500" : ""
                  }`}
                  placeholder="Code postal"
                />
                {errors.codePostal && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.codePostal}</p>
                )}
              </div>
            </div>

            {/* Local */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Local
                </label>
                <input
                  type="text"
                  name="local"
                  value={newAgence.local}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="Local de l'agence"
                />
              </div>
            </div>
          </div>

          <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
            Informations utilisateur
          </h6>

          <div className="flex flex-wrap">
            {/* Username */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  value={newAgence.username}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.username ? "border border-red-500" : ""
                  }`}
                  placeholder="Nom d'utilisateur"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.username}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newAgence.email}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                  placeholder="Email"
                />
                {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Password */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={newAgence.password}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                  placeholder="Mot de passe"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Age */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Âge
                </label>
                <input
                  type="number"
                  name="age"
                  value={newAgence.age}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="Âge"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            >
              Enregistrer l'agence et l'utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}