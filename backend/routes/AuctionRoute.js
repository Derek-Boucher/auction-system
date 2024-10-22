import express from 'express';
import { getAuctions, createAuction, getAuctionById, bidOnAuction } from '../controllers/AuctionController.js';
import { verifyToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.get('/', getAuctions);
router.post('/newAuction', createAuction);
router.get('/:id', getAuctionById);
router.post('/:id/bid', verifyToken, bidOnAuction);

export default router;
