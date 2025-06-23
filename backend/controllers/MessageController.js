import db from '../db.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getChatMessages = asyncHandler(async (req,res)=>{
    const chatId = req.query.chatId; // Assuming chatId is passed as a query parameter
    if (!chatId) {
        return res.status(400).json({ message: 'Chat ID is required' });
    }
    try{
        const {data,error} = await db.from('message').select().eq('chat_id', chatId);
        res.status(200).json(data);
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
        const {data,error} = await db.from('message').insert({
            chat_id: chatId,
            content: content,
            is_user: is_user
        }).select().single();
        if (error) {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});