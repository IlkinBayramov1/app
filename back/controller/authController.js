// import User from '../models/User.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// // ✅ Qeydiyyat hisse
// export const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // İstifadəçi artıq varmı?
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'Email artıq istifadə olunub' });

//     // Şifrəni hash-lə
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Yeni istifadəçi yarad
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: 'Qeydiyyat uğurludur' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Giriş hisse
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // İstifadəçini tap
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

//     // Şifrəni yoxla
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) return res.status(400).json({ message: 'Şifrə səhvdir' });

//     // JWT token yarat
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };







import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Qeydiyyat
export const registerUser = async (req, res) => {
  const { username, email, password, phone, role } = req.body; // phone əlavə olundu

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
      phone, // yeni əlavə olunan hissə
      role: role || 'user', // default user, amma istəyə uyğun 'owner' də ola bilər
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Şifrə yanlışdır' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // ✅ `role` əlavə olundu
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
        phone: user.phone, // ✅ BU SƏTİRİ BURAYA ƏLAVƏ ET
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server xətası', error: err.message });
  }
};
