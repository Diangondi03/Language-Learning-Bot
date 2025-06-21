import db from '../db.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const getUserChats = asyncHandler(async (req,res)=>{
    try{
        const {data,error} = await db.from('chat').select().eq('user_id', req.user.id).order('chat_id', { ascending: false });
        if (error) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})

export const createChat = asyncHandler(async (req,res)=>{

    const { title } = req.body;

    try{
        const {data,error} = await db.from('chat').insert({
            user_id: req.user.id,
            title: title
        }).select();
        res.status(201).json(data[0]);
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})

export const deleteChat = asyncHandler(async (req,res)=>{

    const {id} = req.params;
    

    try{
        await db.from('chat').delete().eq('chat_id', id);
        res.status(200).json({ message: 'Chat deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: 'Internal server error' });
    }
})  