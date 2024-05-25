const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./routes/user');
const matchRoutes = require('./routes/matchRoutes');
const adminRoutes = require('./routes/admin');
const reservationRoutes = require('./routes/reservationRoutes');
const trainingReservationRoutes = require('./routes/trainingReservationRoutes');
const contactRoutes = require('./routes/contactRoutes');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log('Connexion à MongoDB échouée !', error));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/auth', userRoutes);
app.use('/api/matchs', matchRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reserve', reservationRoutes);
app.use('/api/trainingReservations', trainingReservationRoutes);
app.use('/api/contact', contactRoutes);

module.exports = app;
