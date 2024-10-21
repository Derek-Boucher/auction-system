import Auction from '../models/Auction.js';

// Controller to get all auctions with optional search, sorting, and pagination
export const getAuctions = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default to 10 if not specified
  const page = parseInt(req.query.page) || 1; // Default to 1 if not specified

  try {
    const auctions = await Auction.find()
      .skip((page - 1) * limit) // Skip previous auctions
      .limit(limit); // Limit the number of auctions returned

    const totalCount = await Auction.countDocuments(); // Total auctions
    const totalPages = Math.ceil(totalCount / limit); // Calculate total pages

    res.json({ auctions, totalPages }); // Return auctions and total pages
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Controller to create a new auction
export const createAuction = async (req, res) => {
  const { title, startingBid, endTime, imageUrl, description, createdBy } = req.body;

  try {
    // Create a new auction instance
    const newAuction = new Auction({
      title,
      startingBid,
      endTime,
      imageUrl,
      description,
      createdBy,
    });

    await newAuction.save(); // Save the new auction to the database

    res.status(201).json({ message: 'Auction created successfully', auction: newAuction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
