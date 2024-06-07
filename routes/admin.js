const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/dashboard', auth, auth.checkAdmin, (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur le tableau de bord admin !' });
});

module.exports = router;
