import db from '../db.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getUserChats = asyncHandler(async (req,res)=>{
    try{

        const chats = await db.query("SELECT * FROM chat WHERE user_id = $1", [req.user.id]);
        res.status(200).json(chats.rows);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})
