import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    availableRooms: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    images: {
      type: [String], // Şəkillər URL-lər kimi saxlanacaq
      default: [],
    },

  },
  {
    timestamps: true, // createdAt və updatedAt avtomatik yaranacaq
  }
);

export default mongoose.model('Hotel', hotelSchema);
