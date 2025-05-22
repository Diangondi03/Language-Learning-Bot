import db from '../db.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getChatMessages = asyncHandler(async (req,res)=>{
    const chatId = req.query.chatId; // Assuming chatId is passed as a query parameter
    if (!chatId) {
        return res.status(400).json({ message: 'Chat ID is required' });
    }
    try{

        const chats = await db.query("SELECT * FROM message WHERE chat_id = $1", [chatId]);
        res.status(200).json(chats.rows);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})


export const createMessage = asyncHandler(async (req, res) => {
    const { chatId,content,is_user } = req.body;

    if (!chatId || !content) {
        return res.status(400).json({ message: 'chat_id, content are required' });
    }
    try {
        const result = await db.query(
            "INSERT INTO message (chat_id, content, is_user) VALUES ($1, $2, $3) RETURNING *",
            [chatId, content, is_user]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});