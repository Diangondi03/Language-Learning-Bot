import db from '../db.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getUserChats = asyncHandler(async (req,res)=>{
    try{

        const chats = await db.query("SELECT * FROM chat WHERE user_id = $1 ORDER BY chat_id DESC", [req.user.id]);
        res.status(200).json(chats.rows);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})

export const createChat = asyncHandler(async (req,res)=>{

    const { title } = req.body;

    try{
        const newChat = await db.query("INSERT INTO chat (user_id, title) VALUES ($1, $2) RETURNING *", [req.user.id, title]);
        res.status(201).json(newChat.rows[0]);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})

export const deleteChat = asyncHandler(async (req,res)=>{

    const {id} = req.params;
    

    try{
        await db.query("DELETE FROM chat WHERE chat_id = $1", [id]);
        res.status(200).json({ message: 'Chat deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})  