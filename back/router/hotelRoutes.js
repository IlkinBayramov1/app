import express from 'express';
import {
    createHotel,
    getAllHotels,
    getHotelById,
    deleteHotel,
    updateHotel
} from '../controller/hotelController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { onlyOwner } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// ✅ YALNIZ bir dəfə POST / yazırıq
router.post('/', verifyToken, onlyOwner, createHotel);
router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.put('/:id', verifyToken, updateHotel);
router.delete('/:id', verifyToken, deleteHotel);

export default router;
