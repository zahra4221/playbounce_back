const Match = require('../models/Match');

// Ajoutez un match
exports.addMatch = (req, res, next) => {
  const { sport, team1, team2, date, location } = req.body;
  const team1Logo = req.files['team1Logo'] ? `uploads/${req.files['team1Logo'][0].filename}` : null;
  const team2Logo = req.files['team2Logo'] ? `uploads/${req.files['team2Logo'][0].filename}` : null;

  const match = new Match({
    sport,
    team1,
    team1Logo,
    team2,
    team2Logo,
    date,
    location,
    createdBy: req.userData.userId
  });

  match.save()
    .then(() => res.status(201).json({ message: 'Match créé !' }))
    .catch(error => res.status(400).json({ error }));
};

// Obtenir tous les matchs
exports.getAllMatchs = (req, res, next) => {
  Match.find()
    .then(matchs => res.status(200).json(matchs))
    .catch(error => res.status(400).json({ error }));
};

// In your Match controller
exports.updateScore = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    match.score.team1Score = req.body.team1Score;
    match.score.team2Score = req.body.team2Score;
    await match.save();
    res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir toutes les réservations de match
exports.getAllReservations = (req, res, next) => {
  Match.find({}, 'reservations')
    .then(reservations => res.status(200).json(reservations))
    .catch(error => res.status(400).json({ error }));
};


exports.getUserMatchReservations = async (req, res, next) => {
  try {
    const userId = req.userData.userId;

    const matches = await Match.find({ 'reservations.people.userId': userId });

    const userReservations = matches.flatMap(match => 
      match.reservations.filter(reservation =>
        reservation.people.some(person => person.userId.toString() === userId)
      ).map(reservation => ({
        matchId: match._id,
        sport: match.sport,
        team1: match.team1,
        team2: match.team2,
        date: match.date,
        numPeople: reservation.numPeople,
        people: reservation.people.filter(person => person.userId.toString() === userId)
      }))
    );

    res.status(200).json(userReservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations de match:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations de match', error });
  }
};

// Supprimer un match
exports.deleteMatch = (req, res, next) => {
  Match.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({ message: 'Match supprimé !' }))
    .catch(error => res.status(400).json({ error }));
};
