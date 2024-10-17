import Auction from '../models/Auction.js';

// Controller to get all auctions with optional search and sorting
export const getAuctions = async (req, res) => {
  const { search, sortBy } = req.query;

  try {
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Retrieve auctions from the database
    const auctions = await Auction.find(query).sort(sortBy ? { [sortBy]: 1 } : {});
    res.status(200).json(auctions); 
  } catch (error) {
    console.error(error);
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
