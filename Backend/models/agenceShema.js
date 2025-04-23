const mongoose = require("mongoose");

const agenceSchema = new mongoose.Schema(
  {
    Nom: {
      type: String,
      required: true,
      unique: true,
    },
    ville: {
      type: String,
    },
    codePostal: {
      type: String,
    },
    local: {
      type: String,
    },
    users : [{type : mongoose.Schema.Types.ObjectId,ref: 'user'}],
    
  },
  { timestamps: true }
  
);

const agence = mongoose.model("agence", agenceSchema);
module.exports = agence;