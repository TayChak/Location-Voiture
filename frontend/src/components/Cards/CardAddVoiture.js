import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AddCar } from "../../services/ApiCar";

export default function CardAddVoiture() {
  const history = useHistory();
  const [newCar, setNewCar] = useState({
    matricule: "",
    model: "",
    marque: "",
    TypeDeCarburant: "",
    Transmission: "",
    Categorie: "",
    NombreDeSiege: "",
    prix: "",
    prix_jour: "",
    couleur: "",
    disponible: true,
    voiture_image: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    setNewCar({ ...newCar, voiture_image: e.target.files[0] });
    if (errors.voiture_image) setErrors({ ...errors, voiture_image: "" });
  };

  const validateForm = () => {
    const formErrors = {};
    const requiredFields = ['matricule', 'model', 'marque', 'TypeDeCarburant', 'prix', 'prix_jour'];
    
    requiredFields.forEach(field => {
      if (!newCar[field]) {
        formErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} est requis`;
      }
    });

    if (!newCar.voiture_image) {
      formErrors.voiture_image = "Image requise";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const formData = new FormData();
    for (const key in newCar) {
      if (newCar[key] !== null && newCar[key] !== undefined) {
        formData.append(key, newCar[key]);
      }
    }

    try {
      await AddCar(formData);
      history.push("/admin/Voiture");
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      alert(error.response?.data?.message || "Erreur lors de l'ajout de la voiture");
    } finally {
      setIsSubmitting(false);
    }
  };

  const carburantOptions = ["Essence", "Diesel", "Hybride", "Électrique", "GPL", "Bioéthanol"];
  const transmissionOptions = ["Manuelle", "Automatique", "Semi-automatique"];
  const categorieOptions = ["Economique", "Compacte", "Berline", "SUV", "Monospace", "Sportive", "Luxe"];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Ajouter une voiture</h6>
          <button
            className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md"
            type="button"
            onClick={() => history.push("/admin/Voiture")}
          >
            Retour
          </button>
        </div>
      </div>

      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Informations véhicule
          </h6>

          <div className="flex flex-wrap">
            {/* Matricule */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Matricule*
                </label>
                <input
                  type="text"
                  name="matricule"
                  value={newCar.matricule}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.matricule ? "border border-red-500" : ""
                  }`}
                  placeholder="AA-123-BB"
                />
                {errors.matricule && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.matricule}</p>
                )}
              </div>
            </div>

            {/* Modèle */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Modèle*
                </label>
                <input
                  type="text"
                  name="model"
                  value={newCar.model}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.model ? "border border-red-500" : ""
                  }`}
                  placeholder="Clio, 208, etc."
                />
                {errors.model && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.model}</p>
                )}
              </div>
            </div>

            {/* Marque */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Marque*
                </label>
                <input
                  type="text"
                  name="marque"
                  value={newCar.marque}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.marque ? "border border-red-500" : ""
                  }`}
                  placeholder="Renault, Peugeot, etc."
                />
                {errors.marque && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.marque}</p>
                )}
              </div>
            </div>

            {/* Type de carburant */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Carburant*
                </label>
                <select
                  name="TypeDeCarburant"
                  value={newCar.TypeDeCarburant}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.TypeDeCarburant ? "border border-red-500" : ""
                  }`}
                >
                  <option value="">Sélectionner</option>
                  {carburantOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.TypeDeCarburant && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.TypeDeCarburant}</p>
                )}
              </div>
            </div>

            {/* Transmission */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Transmission
                </label>
                <select
                  name="Transmission"
                  value={newCar.Transmission}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                >
                  <option value="">Sélectionner</option>
                  {transmissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Catégorie */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Catégorie
                </label>
                <select
                  name="Categorie"
                  value={newCar.Categorie}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                >
                  <option value="">Sélectionner</option>
                  {categorieOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

         
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nombre de sièges
                </label>
                <input
                  type="number"
                  name="NombreDeSiege"
                  value={newCar.NombreDeSiege}
                  onChange={handleChange}
                  min="2"
                  max="9"
                  className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="2-9"
                />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Tarification
          </h6>

          <div className="flex flex-wrap">
          
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Prix 
                </label>
                <input
                  type="number"
                  name="prix"
                  value={newCar.prix}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.prix ? "border border-red-500" : ""
                  }`}
                  placeholder="Prix d'achat"
                  min="0"
                  step="0.01"
                />
                {errors.prix && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.prix}</p>
                )}
              </div>
            </div>

          
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Prix-jour 
                </label>
                <input
                  type="number"
                  name="prix_jour"
                  value={newCar.prix_jour}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.prix_jour ? "border border-red-500" : ""
                  }`}
                  placeholder="Prix location journalière"
                  min="0"
                  step="0.01"
                />
                {errors.prix_jour && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.prix_jour}</p>
                )}
              </div>
            </div>

            {/* Couleur */}
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Couleur
                </label>
                <input
                  type="text"
                  name="couleur"
                  value={newCar.couleur}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="Couleur principale"
                />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Disponibilité & Image
          </h6>

          <div className="flex flex-wrap">
            {/* Disponible */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    name="disponible"
                    checked={newCar.disponible}
                    onChange={(e) =>
                      setNewCar({ ...newCar, disponible: e.target.checked })
                    }
                    className="form-checkbox h-5 w-5 text-lightBlue-600 rounded"
                  />
                  <span className="ml-2 text-blueGray-600 font-bold uppercase text-xs">
                    Disponible immédiatement
                  </span>
                </label>
              </div>
            </div>

            {/* Image */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Photo du véhicule*
                </label>
                <input
                  type="file"
                  name="voiture_image"
                  onChange={handleFileChange}
                  className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.voiture_image ? "border border-red-500" : ""
                  }`}
                  accept="image/*"
                />
                {errors.voiture_image && (
                  <p className="text-red-500 text-xs italic mt-1">
                    {errors.voiture_image}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className={`bg-lightBlue-500 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer la voiture"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}