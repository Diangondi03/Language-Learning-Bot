import express from 'express';
import { createMessage, getChatMessages } from '../controllers/MessageController.js';
const router = express.Router();

router.get("/",getChatMessages)
router.post("/",createMessage)

export default router;