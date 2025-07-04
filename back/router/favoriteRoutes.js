// router/favoriteRoutes.js
import express from 'express';
import { addFavorite, getUserFavorites, removeFavorite } from '../controller/favoriteController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, addFavorite);
router.get('/', verifyToken, getUserFavorites);
router.delete('/:hotelId', verifyToken, removeFavorite);

export default router;
