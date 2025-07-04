// import express from 'express';
// import { getAdminStats } from '../controller/adminController.js';
// import { verifyToken } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Bu route sadəcə token olan istəklərə açıqdır
// router.get('/stats', verifyToken, getAdminStats);

// export default router;


import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  getAllHotelsAdmin,
  deleteHotelAdmin,
  getDashboardStats,
  getPendingHotels,
  approveHotel,
  rejectHotel,
  banUser,
  unbanUser
} from '../controller/adminController.js';

import { verifyToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/dashboard', verifyToken, isAdmin, getDashboardStats);
router.get('/stats', verifyToken, isAdmin, getAdminStats);

router.get('/users', verifyToken, isAdmin, getAllUsers);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.patch('/users/:id/ban', verifyToken, isAdmin, banUser);
router.patch('/users/:id/unban', verifyToken, isAdmin, unbanUser);

router.get('/hotels', verifyToken, isAdmin, getAllHotelsAdmin);
router.delete('/hotels/:id', verifyToken, isAdmin, deleteHotelAdmin);

router.get('/hotels/pending', verifyToken, isAdmin, getPendingHotels);
router.patch('/hotels/:id/approve', verifyToken, isAdmin, approveHotel);
router.patch('/hotels/:id/reject', verifyToken, isAdmin, rejectHotel);

export default router;
