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

// Routes
import authRoutes from './router/authRoutes.js';
import hotelRoutes from './router/hotelRoutes.js';
import adminRoutes from './router/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB bağlantısı
connectDB();

// API route-lar
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Baytend.com backend işləyir ✅');
});


//admin
app.use('/api/admin', adminRoutes);

// Serveri işə sal
app.listen(PORT, () => {
  console.log(`🚀 Server http://localhost:${PORT} ünvanında işləyir`);
});
