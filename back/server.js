// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import hotelRoutes from './router/router.js';
// import connectDB from './config/config.js';


// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use('/api', hotelRoutes);

// connectDB();

// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT} portunda işə düşdü`);
// });


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/config.js';
import path from 'path';


// Routes
import authRoutes from './router/authRoutes.js';
import hotelRoutes from './router/hotelRoutes.js';
import adminRoutes from './router/adminRoutes.js';
import messageRoutes from './router/messageRoutes.js';
import commentRoutes from './router/commentRoutes.js';
import reservationRoutes from './router/reservationRoutes.js';
import uploadRoutes from './router/uploadRoutes.js'; // doğru yolu qeyd et
import favoriteRoutes from './router/favoriteRoutes.js';
import contactRoutes from './router/contactRoutes.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log("ENV JWT_SECRET:", process.env.JWT_SECRET);

// DB bağlantısı
connectDB();

// API route-lar
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/contact', contactRoutes);


// Şəkil fayllarını statik olaraq göstərmək üçün
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


// Default route
app.get('/', (req, res) => {
  res.send('Baytend.com backend işləyir ✅');
});

// Error handling middleware - ən axırda əlavə edilir
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    message: 'Serverdə xəta baş verdi',
    error: err.message,
  });
});

// Serveri işə sal
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} ünvanında işləyir`);
});
