import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token yoxdur və ya düzgün deyil' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token dekodlandı:', decoded); // Bunu əlavə et
    req.user = decoded;
    next();
  } catch (err) {
    console.log('❌ Token xətası:', err.message); // Bunu da əlavə et
    return res.status(401).json({ message: 'Token etibarsızdır' });
  }
};




