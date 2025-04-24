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
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
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
      min: [18, "Age must be at least 18."],
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

// Hash password and initialize fields before saving
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

// Log after saving a new user
userSchema.post("save", function (doc) {
  console.log(`✅ User "${doc.username}" was successfully created.`);
});

// Static method for login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Email not found.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password.");
  }

  return user;
};

// Hide password when converting to JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Check if user has a specific role
userSchema.methods.hasRole = function (role) {
  return this.role === role;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
