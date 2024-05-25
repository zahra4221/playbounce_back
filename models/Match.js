const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  firstName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  
});

const MatchSchema = new Schema({
  sport: { type: String, required: true },
  team1: { type: String, required: true },
  team1Logo: { type: String }, // Nouveau champ pour le logo de l'équipe 1
  team2: { type: String, required: true },
  team2Logo: { type: String }, // Nouveau champ pour le logo de l'équipe 2
  date: { type: Date, required: true },
  location: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: {
    team1Score: { type: Number, default: 0 },
    team2Score: { type: Number, default: 0 }
  },
  reservations: [{ numPeople: Number, people: [ReservationSchema] }]
});

module.exports = mongoose.model('Match', MatchSchema);
