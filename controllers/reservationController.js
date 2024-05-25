const Match = require('../models/Match');

exports.reserveMatch = async (req, res, next) => {
  try {
    const matchId = req.params.id;
    const { numPeople, people } = req.body;
    const userId = req.userData.userId;

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: 'Événement non trouvé !' });
    }

    const totalPeopleReserved = match.reservations.reduce((total, reservation) => total + reservation.numPeople, 0);

    if (totalPeopleReserved + numPeople > 50) {
      return res.status(400).json({ message: 'Nombre maximum de réservations atteint. Vous ne pouvez pas réserver plus de 50 personnes au total.' });
    }

    match.reservations.push({ numPeople, people });

    await match.save();

    res.status(200).json({ message: 'Réservation réussie !' });
  } catch (error) {
    console.error('Error during reservation:', error);
    res.status(500).json({ message: 'Erreur lors de la réservation', error });
  }
};
