import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import logger from "./utils/logger.js";
import connectDB from './config/connection.js';
import socketSetup from './sockets/socket.js';

// Import Routes
import authRoutes from './routes/authRoutes.js'


const app = express();
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));

const server = http.createServer(app);
app.use(logger);

// Use routes
app.use('/api/auth', authRoutes);

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
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
