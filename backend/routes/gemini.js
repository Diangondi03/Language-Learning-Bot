import express from 'express';
import { generateResponse, generateTitle } from '../controllers/GeminiController.js';

const router = express.Router();

router.post("/",generateResponse)
router.post("/title",generateTitle)

export default router;