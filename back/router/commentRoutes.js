import express from 'express';
import { addComment, getCommentsByHotel } from '../controller/commentController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, addComment);
router.get('/:hotelId', getCommentsByHotel);

export default router;
