import express from 'express';
import { getAuctions, createAuction } from '../controllers/AuctionController.js';

const router = express.Router();

router.get('/', getAuctions);
router.post('/newAuction', createAuction);

export default router;
