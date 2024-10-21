import User from '../models/User.js';
import { ObjectId } from 'mongodb';

export const getUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    // Check if ID format is valid
    if(!ObjectId.isValid(id)) { 
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Destructure to avoid updating the _id field
    const { _id, ...updateFields } = updateData;

    try {
        // Find the user by ID
        const user = await User.findOne({ _id: new ObjectId(id) });

        if (!user) { 
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user with new data
        const result = await User.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );

        // Check if the update matched any documents
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the updated user and return it
        const updatedUser = await User.findOne({ _id: new ObjectId(id) });
  
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateUser = async (req, res) => { }

