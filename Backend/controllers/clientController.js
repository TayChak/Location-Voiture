
const clientModel = require("../models/clientSchema");

module.exports.getAllClient= async (req, res) => {
  try {
    const clientList = await clientModel.find();

    if (!clientList || clientList.length === 0) {
      throw new Error("Aucun client trouvé");
    }

    res.status(200).json(clientList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getclientById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await clientModel.findById(id)
    if (!client || client.length === 0) {
      throw new Error("client introuvable");
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteClientById = async (req, res) => {
  try {
    const id = req.params.id;

    const client = await clientModel.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }

    await clientModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Client supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la suppression du client",
      error: error.message 
    });
  }
};

module.exports.addaclient = async (req, res) => {
  try {
    const { Cin, Nom, Prenom,email,Telephone,DateNaissance,Adresse } = req.body

    if (!Cin & !Nom & !Telephone) {
      throw new Error("errue data");
    }
    const client = await clientModel.create({
        Cin,
        Nom,
        Prenom,
        email,
        Telephone,
        DateNaissance,
        Adresse


    });

    res.status(200).json({ client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const { Cin, Nom, Prenom,email,Telephone,DateNaissance,Adresse } = req.body
    const clientById = await clientModel.findById(id);

    if (!clientById) {
      throw new Error("client introuvable");
    }

    if (!Nom & !Prenom & !Cin) {
      throw new Error("errue data");
    }

    await clientModel.findByIdAndUpdate(id, {
      $set: { Nom, Cin,Prenom ,email,Telephone,DateNaissance,Adresse},
    });

    const updated = await clientModel.findById(id);

    res.status(200).json({ updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  