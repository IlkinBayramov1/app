import express from 'express';
import { sendMessage, getMessages } from '../controller/messageController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/send', verifyToken, sendMessage);
router.get('/all', verifyToken, getMessages);

export default router;
