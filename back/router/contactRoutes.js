import express from 'express';
import {
  sendContactMessage,
  getAllMessages,
  markAsSeen
} from '../controller/contactController.js';

import { verifyToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

// ✅ İstifadəçi mesaj göndərir
router.post('/', sendContactMessage);

// ✅ Admin bütün mesajları görür
router.get('/', verifyToken, isAdmin, getAllMessages);

// ✅ Admin mesajı görüldü işarələyir
router.patch('/:id/seen', verifyToken, isAdmin, markAsSeen);

export default router;
