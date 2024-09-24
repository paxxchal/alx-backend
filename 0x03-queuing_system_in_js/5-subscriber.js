import redis from 'redis';

// Create a Redis client
const subscriber = redis.createClient({
  host: 'localhost',
  port: 6379
});

// Handle connection events
subscriber.on('connect', () => {
  console.log('Redis client connected to the server');

  // Subscribe to the 'holberton school' channel
  subscriber.subscribe('holberton school');
});

subscriber.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

// Handle messages received on the subscribed channel
subscriber.on('message', (channel, message) => {
  console.log(message);

  // Unsubscribe and quit if the message is 'KILL_SERVER'
  if (message === 'KILL_SERVER') {
    subscriber.unsubscribe();
    subscriber.quit();
  }
});
