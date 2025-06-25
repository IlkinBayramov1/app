import express from 'express';
import { sendMessage, getMessages } from '../controller/messageController.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/all', getMessages);

export default router;
