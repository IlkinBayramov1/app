import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import hotelRoutes from './router/router.js';
import connectDB from './config/config.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', hotelRoutes);

// MongoDB bağlantısını çağır
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda işə düşdü`);
});
