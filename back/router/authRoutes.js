// // routes/authRoutes.js
// import express from 'express';
// import { register, login } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// export default router;


import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile } from '../controller/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Profil məlumatını almaq üçün (protected route)
router.get('/profile', verifyToken, getProfile);

// Profil məlumatını yeniləmək üçün (protected route)
router.put('/profile', verifyToken, updateProfile);

export default router;
