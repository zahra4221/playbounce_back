const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/admin', auth, auth.checkAdmin, (req, res, next) => {
  res.status(200).json({ message: 'Bienvenue, administrateur !' });
});

module.exports = router;
