import React, { useState } from "react";

const CardReservation = () => {
  
  const [pickupDate, setPickupDate] = useState();
  const [pickupTime, setPickupTime] = useState();
  const [returnDate, setReturnDate] = useState();
  const [returnTime, setReturnTime] = useState();
  const [transmission, setTransmission] = useState("Selectiooner Transmission");
  const [seats, setSeats] = useState("Selectiooner le nombre de siéges");
  const [category, setCategory] = useState("Selectiooner le catégorie");
  const [fuel, setFuel] = useState("Selectiooner le type de carburant");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de soumission ici
    console.log({
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      transmission,
      seats,
      category,
      fuel
    });
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-lightblue-600 rounded-xl shadow-md overflow-hidden border border-gray-200">
    {/* En-tête avec titre centré */}
    <div className="bg-blue-600 px-5 py-4 text-center">
      <h2 className="text-xl font-semibold text-black">Réservation de Voiture</h2>
    </div>
      
      {/* Corps du formulaire */}
      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* Dates et heures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date de retrait */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de retrait</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Heure de retrait */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Date de retour */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de retour</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          {/* Heure de retour */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
            <input
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Options du véhicule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Transmission */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Transmission">Selectionner Transmission</option>
              <option value="automatique">Automatique</option>
              <option value="manuelle">Manuelle</option>
              <option value="semi-automatique">Semi-automatique</option>
            </select>
          </div>
          
          {/* Nombre de sièges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de sièges</label>
            <select
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Siége">Selectionner le nombre de siéges</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="9">9</option>
            </select>
          </div>
          
          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Catégorie">Selectionner le catégorie</option>
              <option value="compacte">Compacte</option>
              <option value="berline">Berline</option>
              <option value="suv">SUV</option>
              <option value="monospace">Monospace</option>
              <option value="utilitaire">Utilitaire</option>
            </select>
          </div>
          
          {/* Carburant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carburant</label>
            <select
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Carburant">Selectionner le type de carburant</option>
              <option value="essence">Essence</option>
              <option value="diesel">Diesel</option>
              <option value="hybride">Hybride</option>
              <option value="electrique">Électrique</option>
            </select>
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-black font-medium py-2.5 px-4 rounded-lg transition duration-200"
        >
          Confirmer la réservation
        </button>
      </form>
    </div>
  );
};

export default CardReservation;