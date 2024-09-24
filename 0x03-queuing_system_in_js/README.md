# Queuing System in JavaScript

This is a simple queuing system built using JavaScript, Express.js, and Redis.

## Requirements
- Ubuntu 18.04
- Node.js 12.x
- Redis 6.0.10

## Setup
1. Download and extract the latest stable Redis version:
   ```
   wget http://download.redis.io/releases/redis-6.0.10.tar.gz
   tar xzf redis-6.0.10.tar.gz
   cd redis-6.0.10
   make
   ```
2. Start the Redis server in the background:
   ```
   src/redis-server &
   ```
3. Verify that the Redis server is running:
   ```
   src/redis-cli ping
   # Output: PONG
   ```
4. Set a key-value pair in Redis:
   ```
   src/redis-cli
   127.0.0.1:[Port]> set Holberton School
   OK
   127.0.0.1:[Port]> get Holberton
   "School"
   ```
5. Kill the Redis server:
   ```
   kill [PID_OF_Redis_Server]
   ```
6. Copy the `dump.rdb` file from the `redis-5.0.7` directory to the root of the Queuing project.

## Running the Queuing System
1. Install the project dependencies:
   ```
   npm install
   ```
2. Start the Queuing System:
   ```
   npm run dev
   ```
3. The server will be running on `http://localhost:3000`.

## Usage
The Queuing System provides the following API endpoints:

- `POST /jobs`: Create a new job in the queue.
- `GET /jobs/:id`: Retrieve the status of a specific job.
- `DELETE /jobs/:id`: Remove a job from the queue.

Refer to the code for more details on the implementation.

## License
This project is licensed under the [ISC License](LICENSE).
