import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Qeydiyyat
export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body; // phone varsa əlavə et, indi yoxdu

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email artıq qeydiyyatdan keçib' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',  // default 'user'
    });

    await newUser.save();
    res.status(201).json({ message: 'İstifadəçi uğurla qeydiyyatdan keçdi' });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    if(user.isBanned) {
      return res.status(403).json({ message: 'İstifadəçi banlanıb' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Şifrə yanlışdır' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Giriş uğurludur',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};


// Profil məlumatını əldə et
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Profil məlumatı alınarkən xəta baş verdi', error: err.message });
  }
};

// Profil məlumatını yenilə
export const updateProfile = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    if (username) user.username = username;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      message: 'Profil uğurla yeniləndi',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Profil yenilənərkən xəta baş verdi', error: err.message });
  }
};
