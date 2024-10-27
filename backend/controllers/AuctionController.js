import mongoose from "mongoose";
import Auction from "../models/Auction.js";

// Controller to get all auctions with optional search, sorting, and pagination
export const getAuctions = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default to 10 if not specified
  const page = parseInt(req.query.page) || 1; // Default to 1 if not specified

  try {
    // Fetch auctions for the specified page and limit
    const auctions = await Auction.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // Use lean to improve performance since we're only reading data

    // Get current time to check if the auction has ended
    const currentTime = Date.now();

    // Add isEnded field to each auction based on endTime
    const auctionsWithStatus = auctions.map((auction) => ({
      ...auction,
      isEnded: new Date(auction.endTime) < currentTime, // true if endTime has passed
    }));

    // Count the total number of auctions
    const totalCount = await Auction.countDocuments();

    // Respond with auctions and the total count (totalAuctions)
    res.json({ auctions: auctionsWithStatus, totalAuctions: totalCount });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to create a new auction
export const createAuction = async (req, res) => {
  const { title, startingBid, endTime, imageUrl, description, createdBy } =
    req.body;

  try {
    // Create a new auction instance
    const newAuction = new Auction({
      title,
      startingBid,
      endTime,
      imageUrl,
      description,
      createdBy,
      bids: [],
    });

    await newAuction.save(); // Save the new auction to the database

    res
      .status(201)
      .json({ message: "Auction created successfully", auction: newAuction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to get a single auction by ID
export const getAuctionById = async (req, res) => {
  const { id } = req.params;

  try {
    const auction = await Auction.findById(id);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json(auction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to place a bid on an auction
export const bidOnAuction = async (req, res, io) => {
  const { id } = req.params; // Retrieve the auction ID from the request parameters
  const { bidAmount } = req.body; // Retrieve the bid amount from the request body

  try {
    // Check if the auction exists
    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    console.log("Bid Amount:", bidAmount);
    console.log("Starting Bid:", auction.startingBid);

    if (bidAmount < auction.startingBid) {
      return res
        .status(400)
        .json({ message: "Bid must be greater than the starting bid" });
    }

    const userId = req.user.userId; // Get the user ID from the request

    // Check if the auction is still active
    if (new Date() > new Date(auction.endTime)) {
      return res.status(400).json({ message: "Auction has ended" });
    }

    // Validate the bid amount
    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({
        message: `Bid must be greater than the current bid of ${auction.currentBid}`,
      });
    }

    // Create a new bid object
    const newBid = {
      userId,
      amount: bidAmount,
    };

    auction.bids.push(newBid); // Add the new bid to the auction's bid history
    auction.currentBid = bidAmount; // Update the current bid amount
    await auction.save(); // Save the changes to the database

    // Emit updated auction details to all connected clients
    io.emit("bidUpdate", auction); // Emit the updated auction object, not just the new bid

    // Return a success response with the updated auction details
    res.status(200).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAuctionsByUser = async (req, res) => {
  const { id } = req.params; // Retrieve the user ID from route parameters
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;

  try {
    // Ensure userId is a valid ObjectId format
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Convert userId to ObjectId for MongoDB query
    const userObjectId = new mongoose.Types.ObjectId(id);

    // Fetch auctions created by the specific user
    const auctions = await Auction.find({ createdBy: userObjectId })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalCount = await Auction.countDocuments({
      createdBy: userObjectId,
    });
    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

    if (auctions.length === 0) {
      return res
        .status(404)
        .json({ message: "No auctions found for this user" });
    }

    res.json({ auctions, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
