import Auction from "../models/Auction.js";

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
      bids: [], // Initialiser les enchères
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
  const { id } = req.params; // Récupère l'ID de l'URL

  try {
    const auction = await Auction.findById(id); // Trouve l'enchère par ID

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.json(auction); // Retourne les détails de l'enchère
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to place a bid on an auction
export const bidOnAuction = async (req, res) => {
  const { id } = req.params; // Récupère l'id de l'enchère à partir des paramètres de la requête
  const { bidAmount } = req.body; // Montant de l'enchère envoyé dans le corps de la requête

  try {
    const auction = await Auction.findById(id); // Cherche l'enchère par ID
    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Utiliser l'ID utilisateur récupéré depuis le token JWT
    const userId = req.user.userId;

    // Vérifier si l'enchère n'est pas déjà terminée
    if (new Date() > new Date(auction.endTime)) {
      return res.status(400).json({ message: "Auction has ended" });
    }

    // Vérifier si le montant de l'enchère est supérieur au montant actuel
    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({
        message: `Bid must be greater than the current bid of ${auction.currentBid}`,
      });
    }

    // Placer la nouvelle enchère
    const newBid = {
      userId, // Utilise l'utilisateur connecté
      amount: bidAmount,
    };

    auction.bids.push(newBid); // Ajoute l'enchère à la liste
    auction.currentBid = bidAmount; // Met à jour l'enchère actuelle
    await auction.save(); // Sauvegarde les modifications

    res.status(200).json({ message: "Bid placed successfully", auction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
