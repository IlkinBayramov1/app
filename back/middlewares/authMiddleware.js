import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js'; // ✅ İstifadəçini tapmaq üçün

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token yoxdur və ya düzgün deyil' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token dekodlandı:', decoded);

    // ✅ İstifadəçini DB-dən tapırıq
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'İstifadəçi tapılmadı' });
    }

    // ✅ Əgər ban olunubsa:
    if (user.isBanned) {
      return res.status(403).json({ message: 'Bu istifadəçi ban olunub' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('❌ Token xətası:', err.message);
    return res.status(401).json({ message: 'Token etibarsızdır' });
  }
};
