const agenceModel = require("../models/agenceShema");
const userModel = require("../models/userSchema");

module.exports.getAllAgences = async (req, res) => {
  try {
    const agenceList = await agenceModel.find();
    if (!agenceList || agenceList.length === 0) {
      return res.status(404).json({ message: "Aucune agence trouvée" });
    }
    res.status(200).json(agenceList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAgenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const agence = await agenceModel.findById(id);
    if (!agence) {
      return res.status(404).json({ message: "Agence introuvable" });
    }
    res.status(200).json(agence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteAgenceById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 1. Trouver l'agence à supprimer
    const agence = await agenceModel.findById(id);
    if (!agence) {
      return res.status(404).json({ message: "Agence introuvable" });
    }

    // 2. Trouver et supprimer l'admin associé à cette agence
    await userModel.deleteMany({ 
      agence: id, 
      role: "client" 
    });
    await agenceModel.findByIdAndDelete(id);

    res.status(200).json({ 
      message: "Agence et administrateur associé supprimés avec succès" 
    });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    res.status(500).json({ 
      message: error.message || "Erreur lors de la suppression" 
    });
  }
};

module.exports.addagence = async (req, res) => {
  try {
    const { Nom, ville, codePostal, local, username, email, password, age } = req.body;

    if (!Nom || !ville || !codePostal || !username || !email || !password) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs requis." });
    }

    // Création de l'agence
    const agence = await agenceModel.create({ Nom, ville, codePostal, local });

    // Création de l'utilisateur client lié à l'agence
    const user = await userModel.create({
      username,
      email,
      password,
      age,
      role: "client",
      agence: agence._id,
    });

    // Ajout du user dans la liste des utilisateurs de l'agence
    await agenceModel.findByIdAndUpdate(agence._id, {
      $push: { users: user._id },
    });

    res.status(200).json({ message: "Agence et utilisateur client créés avec succès", agence, user });
  } catch (error) {
    console.error("Erreur dans addagence:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateAgence = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      Nom, 
      ville, 
      codePostal, 
      local,
      username,
      email,
      age
    } = req.body;

    // Validation des champs requis
    if (!Nom || !ville || !codePostal || !username || !email) {
      return res.status(400).json({ 
        message: "Les champs Nom, ville, code postal, username et email sont obligatoires" 
      });
    }

    // Trouver l'agence existante
    const agence = await agenceModel.findById(id).populate('user');
    if (!agence) {
      return res.status(404).json({ message: "Agence introuvable" });
    }

    // Mise à jour de l'agence
    const updatedAgence = await agenceModel.findByIdAndUpdate(
      id,
      { 
        $set: { 
          Nom, 
          ville, 
          codePostal, 
          local 
        } 
      },
      { new: true }
    );

    // Mise à jour de l'utilisateur associé
    const updatedUser = await userModel.findByIdAndUpdate(
      agence.user._id,
      { $set: { username, email, age } },
      { new: true }
    );

    res.status(200).json({ 
      message: "Agence et utilisateur mis à jour avec succès",
      agence: updatedAgence,
      user: updatedUser
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'agence:", error);
    
    // Gestion des erreurs de validation
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(el => el.message);
      return res.status(400).json({ message: "Erreur de validation", errors });
    }
    
    // Gestion des erreurs de duplication (email ou username unique)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ 
        message: `${field} est déjà utilisé par un autre utilisateur` 
      });
    }

    res.status(500).json({ 
      message: "Erreur serveur lors de la mise à jour de l'agence",
      error: error.message 
    });
  }
};

module.exports.affect = async (req, res) => {
  try {
    const { agenceId, userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const agence = await agenceModel.findById(agenceId);
    if (!agence) {
      return res.status(404).json({ message: "Agence introuvable" });
    }

    // Affectation
    await userModel.findByIdAndUpdate(userId, { $set: { agence: agenceId } });
    await agenceModel.findByIdAndUpdate(agenceId, { $push: { users: userId } });

    res.status(200).json({ message: "Utilisateur affecté à l'agence avec succès" });
  } catch (error) {
    console.error("Erreur dans affect:", error);
    res.status(500).json({ message: error.message || "Erreur lors de l'affectation" });
  }
};
