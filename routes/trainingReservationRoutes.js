const express = require('express');
const router = express.Router();
const trainingReservationController = require('../controllers/trainingReservationController');
const auth = require('../middlewares/auth');

router.post('/', auth, trainingReservationController.makeReservation);
router.get('/', auth, trainingReservationController.getReservations);
router.get('/user', auth, trainingReservationController.getUserReservations);

module.exports = router;
