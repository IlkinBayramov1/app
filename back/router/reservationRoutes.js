import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createReservation, getUserReservations } from '../controller/reservationController.js';

const router = express.Router();

router.post('/', verifyToken, createReservation);
router.get('/my', verifyToken, getUserReservations);

export default router;
