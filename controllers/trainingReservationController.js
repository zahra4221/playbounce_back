const TrainingReservation = require('../models/TrainingReservation');

exports.makeReservation = async (req, res) => {
  try {
    const { firstName, email, phone, date, time, numPlayers, fieldType } = req.body;
    const userId = req.userData.userId;

    console.log('Received data:', req.body);
    console.log('User ID:', userId);

    const conflictingReservation = await TrainingReservation.findOne({ date, time, fieldType });
    if (conflictingReservation) {
      console.log('Conflicting reservation found:', conflictingReservation);
      return res.status(400).json({ message: `Ce créneau horaire est déjà réservé pour le type de terrain ${fieldType}.` });
    }

    const reservation = new TrainingReservation({ userId, firstName, email, phone, date, time, numPlayers,fieldType });
    await reservation.save();
    res.status(201).json({ message: 'Réservation réussie !' });
  } catch (error) {
    console.error('Error during reservation:', error);
    res.status(500).json({ message: 'Erreur lors de la réservation', error });
  }
};

const Match = require('../models/Match');

exports.getUserMatchReservations = async (req, res, next) => {
  try {
    const userId = req.userData.userId;
    const matches = await Match.find({ 'reservations.people.userId': userId });

    const userReservations = matches.map(match => {
      return match.reservations.filter(reservation =>
        reservation.people.some(person => person.userId.toString() === userId)
      ).map(reservation => ({
        matchId: match._id,
        sport: match.sport,
        team1: match.team1,
        team2: match.team2,
        date: match.date,
        numPeople: reservation.numPeople,
        people: reservation.people.filter(person => person.userId.toString() === userId)
      }));
    }).flat();

    res.status(200).json(userReservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations de match:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations de match', error });
  }
};


exports.getReservations = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const reservations = await TrainingReservation.find({ userId });
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const reservations = await TrainingReservation.find({ userId });
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error });
  }
};
