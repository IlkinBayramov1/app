import express from 'express';
import { addComment, getCommentsByHotel, deleteComment, updateComment } from '../controller/commentController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, addComment);
router.get('/:hotelId', getCommentsByHotel);
router.delete('/:id', verifyToken, deleteComment);
router.put('/:id', verifyToken, updateComment); // PUT ilə redaktə



export default router;
