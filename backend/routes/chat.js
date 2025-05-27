import express from 'express';
import { getUserChats, createChat, deleteChat } from '../controllers/ChatController.js';
const router = express.Router();

router.get("/",getUserChats)
router.post("/",createChat)
router.delete("/:id",deleteChat)

export default router;