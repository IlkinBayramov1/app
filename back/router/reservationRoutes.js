import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  createReservation,
  getUserReservations,
  getOwnerReservations,
  cancelReservation,
} from '../controller/reservationController.js';

const router = express.Router();

router.post('/', verifyToken, createReservation);
router.get('/my', verifyToken, getUserReservations);
router.get('/owner', verifyToken, getOwnerReservations);
router.delete('/:id', verifyToken, cancelReservation);

export default router;
