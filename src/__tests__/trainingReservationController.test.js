import { describe, it, expect } from 'vitest';
import mongoose from 'mongoose';
import TrainingReservation from '../../models/TrainingReservation';
import { getUserReservations } from '../../controllers/trainingReservationController';

// Connexion à la base de données de test avant les tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
});

// Nettoyage de la base de données après chaque test
afterEach(async () => {
  await TrainingReservation.deleteMany({});
});

// Fermeture de la connexion après tous les tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('getUserReservations', () => {
  it('should return all reservations for a user', async () => {
    const req = {
      userData: { userId: 'user123' }
    };
    const res = {
      status: (code) => {
        expect(code).toBe(200);
        return res;
      },
      json: (data) => {
        expect(data.length).toBe(1);
        expect(data[0].email).toBe('john@example.com');
      }
    };

    await TrainingReservation.create({
      userId: 'user123',
      firstName: 'John',
      email: 'john@example.com',
      phone: '1234567890',
      date: '2023-06-01',
      time: '10:00',
      numPlayers: 4,
      fieldType: 'football',
    });

    await getUserReservations(req, res);
  });
});
