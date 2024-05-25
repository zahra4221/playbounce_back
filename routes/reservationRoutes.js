const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middlewares/auth');
// Route pour réserver un événement
router.post('/:id', auth, reservationController.reserveMatch);

module.exports = router;
