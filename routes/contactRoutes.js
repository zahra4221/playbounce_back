const { sendContactEmail } = require('../utils/mailer/mailerContact');
const express = require('express');
const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { prenom, email, message } = req.body;
    console.log('Prénom:', prenom);  // Debug: Vérifiez les données reçues
    console.log('Email:', email);
    console.log('Message:', message);

    await sendContactEmail({ prenom, email, message });
    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.log('Erreur lors de la récupération des données:', error);
    res.status(500).json({ message: 'Erreur lors de l envoi de l email', error: error.toString() });
  }
});

module.exports = router;
