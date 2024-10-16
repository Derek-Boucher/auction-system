import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import logger from "./utils/logger.js";
import connectDB from './config/connection.js';
import socketSetup from './sockets/socket.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));

const server = http.createServer(app);
app.use(logger);

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Init sockets
socketSetup(io);

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
