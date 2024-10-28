import express from "express";
import {
  bidOnAuction,
  createAuction,
  getAuctionById,
  getAuctions,
  getAuctionsByUser,
  getWonAuctions,
} from "../controllers/AuctionController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Function to initialize routes with io
const auctionRoutes = (io) => {
  router.get("/", getAuctions);
  router.post("/newAuction", createAuction);
  router.get("/:id", getAuctionById);
  router.get("/users/:id", getAuctionsByUser);
  router.get("/won/:userId", getWonAuctions);
  router.post("/:id/bid", verifyToken, (req, res) =>
    bidOnAuction(req, res, io)
  ); // Pass io to the controller

  return router;
};

export default auctionRoutes;
