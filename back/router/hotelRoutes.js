// import express from 'express';
// import {
//     createHotel,
//     getAllHotels,
//     getHotelById,
//     deleteHotel,
//     updateHotel
// } from '../controller/hotelController.js';
// import { verifyToken } from '../middlewares/authMiddleware.js';
// import { onlyOwner } from '../middlewares/roleMiddleware.js';

// const router = express.Router();

// router.post('/', verifyToken, onlyOwner, createHotel);
// router.get('/', getAllHotels);
// router.get('/:id', getHotelById);
// router.put('/:id', verifyToken, updateHotel);
// router.delete('/:id', verifyToken, deleteHotel);

// export default router;

import express from 'express';
import multer from 'multer';
import {
    createHotel,
    getAllHotels,
    getHotelById,
    deleteHotel,
    updateHotel
} from '../controller/hotelController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { onlyOwner } from '../middlewares/onlyOwner.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', verifyToken, createHotel);

router.get('/', getAllHotels);

router.get('/:id', getHotelById);

router.put('/:id', verifyToken, onlyOwner, upload.array('images', 5), (req, res, next) => {
  if (req.files) {
    req.body.images = req.files.map(file => `/uploads/${file.filename}`);
  }
  next();
}, updateHotel);

router.delete('/:id', verifyToken, onlyOwner, deleteHotel);

export default router;
