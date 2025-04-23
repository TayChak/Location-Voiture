const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    reservations : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
    matricule: {
      type: String,
      required: true,
      unique: true,
    },
    model: {
      type: String,
    },
    marque: {
      type: String,
    },
    TypeDeCarburant: {
      type: String,
      enum: ["Essence", "Diesel", "Hybride", "Électrique", "GPL", "Bioéthanol"],
      required: true
    },
    prix: {
      type: Number,
    },
    prix_jour: {
      type: Number,
    },
    couleur: {
      type: String,
    },
    Transmission: {
      type: String,
      enum: ["Manuelle", "Automatique", "Semi-automatique"],
    },
    Categorie: {
      type: String,
      enum: ["Economique", "Compacte", "Berline", "SUV", "Monospace", "Sportive", "Luxe"],
    },
    NombreDeSiege: {
      type: Number, 
      min: 2,
      max: 9
    },
    disponible: {
      type: Boolean,
      default: true
    },
    voiture_image: {
      type: String,
      required: false,
      default: "voiture.png",
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
module.exports = Car;