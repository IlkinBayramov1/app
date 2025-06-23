import express from 'express';
import {
  createHotel,
  getAllHotels,
  getHotelById,
  deleteHotel,
  updateHotel
} from '../controller/hotelController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createHotel);
router.get('/', getAllHotels);
router.get('/:id', getHotelById);
router.put('/:id', verifyToken, updateHotel);
router.delete('/:id', verifyToken, deleteHotel);

export default router;
