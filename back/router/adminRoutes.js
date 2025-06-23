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
  deleteHotelAdmin
} from '../controller/adminController.js';

import { verifyToken } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/stats', verifyToken, isAdmin, getAdminStats);
router.get('/users', verifyToken, isAdmin, getAllUsers);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.get('/hotels', verifyToken, isAdmin, getAllHotelsAdmin);
router.delete('/hotels/:id', verifyToken, isAdmin, deleteHotelAdmin);

export default router;
