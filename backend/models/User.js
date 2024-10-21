import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  auctionsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auction' }],
});

export default mongoose.model('User', userSchema);