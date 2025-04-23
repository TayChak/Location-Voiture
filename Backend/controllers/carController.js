const carModel = require("../models/carSchema");
const fs = require('fs');
const path = require('path');

module.exports.getAllCars = async (req, res) => {
  try {
    const carList = await carModel.find();

    if (!carList || carList.length === 0) {
      return res.status(404).json({ message: "Aucune voiture trouvée" });
    }

    res.status(200).json(carList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await carModel.findById(id);

    if (!car) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteCarById = async (req, res) => {
  try {
    const id = req.params.id;

    const car = await carModel.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    // Supprimer l'image associée si ce n'est pas l'image par défaut
    if (car.voiture_image && car.voiture_image !== "voiture.png") {
      const imagePath = path.join(__dirname, '..', 'uploads', car.voiture_image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: "Voiture supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addCar = async (req, res) => {
  try {
    const {
      model,
      matricule,
      marque,
      TypeDeCarburant,
      Transmission,
      Categorie,
      NombreDeSiege,
      prix,
      prix_jour,
      couleur,
      disponible
    } = req.body;

    if (!model || !matricule || !prix) {
      return res.status(400).json({ message: "Données manquantes (modèle, matricule ou prix)" });
    }

    const voiture_image = req.file ? req.file.filename : "voiture.png";

    const car = await carModel.create({
      model,
      matricule,
      marque,
      TypeDeCarburant,
      Transmission,
      Categorie,
      NombreDeSiege: Number(NombreDeSiege),
      prix: Number(prix),
      prix_jour: Number(prix_jour),
      couleur,
      voiture_image,
      disponible: disponible !== undefined ? disponible : true
    });

    res.status(201).json(car);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Une voiture avec cette matricule existe déjà" });
    }
    res.status(500).json({ message: error.message });
  }
};
module.exports.updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const { model, matricule, marque, TypeDeCarburant, Categorie, Transmission, NombreDeSiege, prix, prix_jour, couleur, disponible } = req.body;

    // Vérifier si la voiture existe
    const carById = await carModel.findById(id);
    if (!carById) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    // Validation des champs requis
    if (!model || !prix || !matricule) {
      return res.status(400).json({ message: "Les champs 'modèle', 'prix' et 'matricule' sont requis" });
    }

    // Mise à jour de la voiture
    const updatedCar = await carModel.findByIdAndUpdate(id, {
      $set: {
        disponible,
        model,
        matricule,
        marque,
        TypeDeCarburant,
        Transmission,
        Categorie,
        NombreDeSiege,
        prix,
        prix_jour,
        couleur
      }
    }, { new: true }); // Le paramètre `{ new: true }` renvoie le document mis à jour.

    // Si la mise à jour échoue
    if (!updatedCar) {
      return res.status(500).json({ message: "Erreur lors de la mise à jour de la voiture" });
    }

    // Renvoyer la voiture mise à jour
    res.status(200).json({ updatedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};
