import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    trim: true,
    required: false, // Əgər mütləqdirsə: true yaz
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'owner'], // <- "owner" əlavə olundu
    default: 'user',
  },
}, {
  timestamps: true,
});


export default mongoose.model('User', userSchema);
