const mongoose = require('mongoose');

const trainingReservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  numPlayers: { type: Number, required: true },
  fieldType: { type: String, required: true },
  duration: { type: Number, default: 2 }, // durée en heures
});

module.exports = mongoose.models.TrainingReservation || mongoose.model('TrainingReservation', trainingReservationSchema);
