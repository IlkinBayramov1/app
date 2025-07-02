import multer from 'multer';
import path from 'path';

// Şəkillər üçün diskdə saxlanacaq qovluq və fayl adı təyin edirik
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // uploads qovluğu yaradılmalıdır
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // unikal fayl adı
  },
});

const fileFilter = (req, file, cb) => {
  // Yalnız şəkillərə icazə veririk
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Yalnız şəkil fayllarına icazə verilir'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
