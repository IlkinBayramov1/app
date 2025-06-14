import express from 'express';
import {
  createHotel,
  getAllHotels,
  getHotelById,
  deleteHotel,
  updateHotel,
} from '../controller/hotelController.js';

const router = express.Router();

router.post('/hotels', createHotel);
router.get('/hotels', getAllHotels);
router.get('/hotels/:id', getHotelById);
router.delete('/hotels/:id', deleteHotel);
router.put('/hotels/:id', updateHotel);

export default router;
