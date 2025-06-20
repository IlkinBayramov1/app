import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB bağlantısı uğurla quruldu');
  } catch (err) {
    console.error('❌ MongoDB bağlantı xətası:', err.message);
    process.exit(1); 
  }
};

export default connectDB;
