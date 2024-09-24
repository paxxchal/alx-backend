import express from 'express';
import { promisify } from 'util';
import redis from 'redis';
import kue from 'kue';

// Redis client
const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

// Promisify Redis methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Kue queue
const queue = kue.createQueue();

// Initialize available seats
const INITIAL_AVAILABLE_SEATS = 50;
client.set('available_seats', INITIAL_AVAILABLE_SEATS);

// Reservation enabled flag
let reservationEnabled = true;

// Function to reserve a seat
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

// Function to get the current available seats
async function getCurrentAvailableSeats() {
  return parseInt(await getAsync('available_seats'), 10);
}

// Express server
const app = express();
app.use(express.json());

// GET /available_seats
app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

// GET /reserve_seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (!err) {
      res.json({ status: 'Reservation in process' });
    } else {
      res.json({ status: 'Reservation failed' });
    }
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (err) => {
    console.log(`Seat reservation job ${job.id} failed: ${err.message}`);
  });
});

// GET /process
app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const currentAvailableSeats = await getCurrentAvailableSeats();
    const newAvailableSeats = currentAvailableSeats - 1;

    if (newAvailableSeats < 0) {
      done(new Error('Not enough seats available'));
    } else {
      await reserveSeat(newAvailableSeats);

      if (newAvailableSeats === 0) {
        reservationEnabled = false;
      }

      done();
    }
  });
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});
