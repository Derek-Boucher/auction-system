import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/connection.js";
import socketSetup from "./sockets/socket.js";
import logger from "./utils/logger.js";

// Import Routes
import auctionRoutes from "./routes/AuctionRoute.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

const app = express();
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = http.createServer(app);
app.use(logger);

// Socket.io configuration
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: [""],
    credentials: true,
  },
});

// Init sockets
socketSetup(io);

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes(io));
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
