import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  seen: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema);
