import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/.+\@.+\..+/, 'Email formatı düzgün deyil'] },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['user', 'admin', 'owner'], default: 'user' },
  isBanned: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
