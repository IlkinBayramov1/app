import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} from '../controller/hotelController.js';

const router = express.Router();

// Mövcud endpointlər
router.post('/', verifyToken, createHotel);
router.get('/', getAllHotels);
router.get('/:id', getHotelById);

// Yeni - sahibin öz otellərini gətirir
router.get('/my', verifyToken, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'İstifadəçi məlumatı yoxdur' });
    }

    const myHotels = await Hotel.find({ owner: req.user.id });
    res.status(200).json({ data: myHotels });
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
});

router.put('/:id', verifyToken, updateHotel);
router.delete('/:id', verifyToken, deleteHotel);

export default router;
