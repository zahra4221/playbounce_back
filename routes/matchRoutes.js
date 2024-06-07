const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const upload = require('../middlewares/multer');
const auth = require('../middlewares/auth');

router.post('/add', auth, upload.fields([{ name: 'team1Logo', maxCount: 1 }, { name: 'team2Logo', maxCount: 1 }]), matchController.addMatch);

router.get('/', matchController.getAllMatchs);
router.get('/reservations', matchController.getAllReservations);
router.delete('/:id', auth, matchController.deleteMatch);
router.get('/reservations/user', auth, matchController.getUserMatchReservations);
router.put('/score/:id', auth, matchController.updateScore);

module.exports = router;
