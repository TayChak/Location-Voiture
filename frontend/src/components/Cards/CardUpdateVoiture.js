import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getCarById, updateCar } from "../../services/ApiCar";

export default function UpdateVoiture() {
  const { id } = useParams();
  const history = useHistory();
  const [car, setCar] = useState({
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
    disponible: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await getCarById(id);
        setCar(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        alert("Erreur lors du chargement de la voiture");
        history.push("/admin/Voiture");
      }
    };
    fetchCar();
  }, [id, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const formErrors = {};
    if (!car.matricule) formErrors.matricule = "Matricule requis";
    if (!car.model) formErrors.model = "Modèle requis";
    if (!car.marque) formErrors.marque = "Marque requise";
    if (!car.prix) formErrors.prix = "Prix requis";
    if (!car.prix_jour) formErrors.prix_jour = "Prix par jour requis";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Send data to API
    try {
      await updateCar(car, id); // Pass car data and id to the update function
      alert("Voiture mise à jour avec succès");
      history.push("/admin/Voiture");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour de la voiture");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const carburantOptions = ["Essence", "Diesel", "Hybride", "Électrique", "GPL", "Bioéthanol"];
  const transmissionOptions = ["Manuelle", "Automatique", "Semi-automatique"];
  const categorieOptions = ["Economique", "Compacte", "Berline", "SUV", "Monospace", "Sportive", "Luxe"];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Modifier la voiture</h6>
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
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Informations véhicule</h6>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Matricule*</label>
                <input
                  type="text"
                  name="matricule"
                  value={car.matricule}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.matricule ? "border border-red-500" : ""
                  }`}
                  placeholder="AA-123-BB"
                />
                {errors.matricule && <p className="text-red-500 text-xs italic mt-1">{errors.matricule}</p>}
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Modèle*</label>
                <input
                  type="text"
                  name="model"
                  value={car.model}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.model ? "border border-red-500" : ""
                  }`}
                  placeholder="Clio, 208, etc."
                />
                {errors.model && <p className="text-red-500 text-xs italic mt-1">{errors.model}</p>}
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Marque*</label>
                <input
                  type="text"
                  name="marque"
                  value={car.marque}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.marque ? "border border-red-500" : ""
                  }`}
                  placeholder="Renault, Peugeot, etc."
                />
                {errors.marque && <p className="text-red-500 text-xs italic mt-1">{errors.marque}</p>}
              </div>
            </div>

            {/* Carburant, Transmission, Catégorie */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Carburant</label>
                <select
                  name="TypeDeCarburant"
                  value={car.TypeDeCarburant}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                >
                  {carburantOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Transmission</label>
                <select
                  name="Transmission"
                  value={car.Transmission}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                >
                  {transmissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Catégorie</label>
                <select
                  name="Categorie"
                  value={car.Categorie}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                >
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
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Nombre de sièges</label>
                <input
                  type="number"
                  name="NombreDeSiege"
                  value={car.NombreDeSiege}
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

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Tarification</h6>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Prix (€)*</label>
                <input
                  type="number"
                  name="prix"
                  value={car.prix}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.prix ? "border border-red-500" : ""
                  }`}
                  placeholder="Prix d'achat"
                  min="0"
                  step="0.01"
                />
                {errors.prix && <p className="text-red-500 text-xs italic mt-1">{errors.prix}</p>}
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Prix/jour (€)*</label>
                <input
                  type="number"
                  name="prix_jour"
                  value={car.prix_jour}
                  onChange={handleChange}
                  className={`border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full ${
                    errors.prix_jour ? "border border-red-500" : ""
                  }`}
                  placeholder="Prix location journalière"
                  min="0"
                  step="0.01"
                />
                {errors.prix_jour && <p className="text-red-500 text-xs italic mt-1">{errors.prix_jour}</p>}
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">Couleur</label>
                <input
                  type="text"
                  name="couleur"
                  value={car.couleur}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 text-blueGray-600 bg-white rounded text-sm shadow w-full"
                  placeholder="Couleur principale"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="form-check">
              <input
                type="checkbox"
                name="disponible"
                checked={car.disponible}
                onChange={(e) => setCar({ ...car, disponible: e.target.checked })}
                className="form-check-input"
              />
              <label className="form-check-label text-blueGray-600 text-xs font-bold">Disponible</label>
            </div>
            <button
              type="submit"
              className="bg-lightBlue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
