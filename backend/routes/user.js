import express from 'express';
import { getUserById, updateUserById } from '../controllers/UserController.js';
const router = express.Router();

router.get('/', getUserById);
router.patch('/', updateUserById);

export default router;