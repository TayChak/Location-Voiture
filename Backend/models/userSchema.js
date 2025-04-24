const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Veuillez entrer une adresse e-mail valide"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "client", "infi"],
      default: "client",
    },
    user_image: {
      type: String,
      default: "client.png",
    },
    age: {
      type: Number,
      min: [18, "L'âge doit être d'au moins 18 ans."],
    },
    count: {
      type: Number,
      default: 0,
    },
    agence: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agence",
    },
    etat: {
      type: Boolean,
      default: false,
    },
    ban: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash du mot de passe + initialisation de certains champs
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.isNew) {
      this.count = 1;
      this.etat = false;
      this.ban = true;
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Log après création
userSchema.post("save", function (doc) {
  console.log(`✅ Utilisateur "${doc.username}" créé avec succès.`);
});

// Méthode statique de connexion
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Adresse e-mail introuvable.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Mot de passe incorrect.");
  }

  return user;
};

// Méthode pour masquer le mot de passe à l’export JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Vérifie si l'utilisateur a un rôle spécifique
userSchema.methods.hasRole = function (role) {
  return this.role === role;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
