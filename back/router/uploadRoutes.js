import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';  // sənin multer config

const router = express.Router();

// Bir şəkil yükləmək üçün route
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Fayl yüklənmədi' });
    }

    // req.file.path və ya req.file.filename ilə faylın yolunu göndərə bilərsən
    res.status(200).json({ 
      message: 'Fayl uğurla yükləndi',
      filename: req.file.filename,
      path: req.file.path,
    });
  } catch (err) {
    res.status(500).json({ message: 'Yükləmə zamanı xəta', error: err.message });
  }
});

export default router;
