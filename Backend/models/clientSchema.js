const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    Cin: {
      type: Number,
      required: true,
      unique: true,
    },
    Nom: {
      type: String,
      required: true,
    },
    Prenom: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    Telephone: {
      type: String,
    },
    DateNaissance: {
      type: Date,
    },
    Adresse: {
      type: String,
    },
    reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
