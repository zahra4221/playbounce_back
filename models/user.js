// Importation des modules nécessaires
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Définition du schéma utilisateur
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Ajout du champ 'role'
});

// Utilisation du plugin uniqueValidator sur le schéma pour éviter d'avoir plusieurs utilisateurs sur la même adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
