import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  endTime: { type: Date, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bids: [bidSchema],
});

export default mongoose.model('Auction', auctionSchema);
