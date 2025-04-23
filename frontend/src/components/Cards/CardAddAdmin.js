import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addUserClient } from "../../services/ApiUser";

export default function CardAddAdmin() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Nom d'utilisateur requis";
    if (!formData.email.trim()) {
      newErrors.email = "Email requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 caractères";
    }
    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age)) {
      newErrors.age = "Âge requis";
    } else if (age < 18 || age > 100) {
      newErrors.age = "Âge doit être entre 18 et 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      await addUserClient(data);
      alert("Administrateur ajouté avec succès !");
      history.push("/admin/Agence");
    } catch (error) {
      console.error("Erreur:", error);
      alert(error.response?.data?.message || "Erreur lors de l'ajout de l'administrateur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Ajouter un administrateur</h6>
          <button
            className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md"
            type="button"
            onClick={() => history.push("/admin/Agence")}
          >
            Retour
          </button>
        </div>
      </div>

      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informations personnelles
          </h6>

          <div className="flex flex-wrap">
            {/* Nom d'utilisateur */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.username ? "border border-red-500" : ""
                  }`}
                  placeholder="john_doe"
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
                  value={formData.email}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                  placeholder="admin@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Mot de passe */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.password ? "border border-red-500" : ""
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Âge */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Âge
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="18"
                  max="100"
                  className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.age ? "border border-red-500" : ""
                  }`}
                  placeholder="30"
                />
                {errors.age && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.age}</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer l'administrateur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
