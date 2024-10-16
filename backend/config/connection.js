import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Connect to the mongo db 
const connectDB = async () => {
    try {
      mongoose.connect(process.env.MONGO_URI); 
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection failed', error);
      process.exit(1);
    }
  };

export default connectDB;