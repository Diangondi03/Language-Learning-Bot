import db from '../db.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getUserById = asyncHandler( async(req, res) => {
    
    
    try {
        const user = req.user; // Assuming user_id is stored in req.user after authentication
        
    
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})