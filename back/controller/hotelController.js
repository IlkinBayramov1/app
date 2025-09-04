import Hotel from '../models/hotel.js';
import mongoose from 'mongoose';

// Yeni hotel əlavə et
export const createHotel = async (req, res) => {
  try {
    // Multer ilə yüklənən şəkilləri al
    const uploadedImages = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];

    // Frontend-dən gələn URL-ləri parse et
    let urlImages = [];
    if (req.body.imageUrls) {
      try {
        urlImages = JSON.parse(req.body.imageUrls);
        if (!Array.isArray(urlImages)) urlImages = [];
      } catch {
        urlImages = [];
      }
    }

    // Bütün şəkilləri birləşdir
    const images = [...uploadedImages, ...urlImages];

    // Otel məlumatlarını hazırlamaq üçün lazımi sahələri topla
    const allowedFields = ['name', 'location', 'pricePerNight', 'description', 'availableRooms', 'rating'];
    const hotelData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        hotelData[field] = req.body[field];
      }
    });

    // Yeni otel yarat
    const newHotel = new Hotel({
      ...hotelData,
      images,            // Birləşdirilmiş şəkillər
      image: images[0] || '',  // Əsas şəkil kimi ilk şəkil
      owner: req.user.id,
      status: 'pending',
    });

    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(500).json({ message: 'Hotel əlavə edilə bilmədi', error: err.message });
  }
};



// Bütün hotelləri səhifələmə və filtr ilə gətir
export const getAllHotels = async (req, res) => {
  try {
    const { page = 1, limit = 10, location, minPrice, maxPrice } = req.query;

    const filter = {};
    if (location) filter.location = location;
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }

    const hotels = await Hotel.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Hotel.countDocuments(filter);

    res.status(200).json({
      data: hotels,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: 'Hotel siyahısı alınmadı', error: err.message });
  }
};

// ID ilə hotel tap
export const getHotelById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Yanlış hotel ID' });
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel tapılmadı' });

    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
};

// Hotel yenilə
export const updateHotel = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Yanlış hotel ID' });
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel tapılmadı' });

    if (hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu əməliyyatı həyata keçirmək üçün səlahiyyətiniz yoxdur' });
    }

    const allowedUpdates = ['name', 'location', 'pricePerNight', 'description', 'availableRooms', 'rating'];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        hotel[field] = req.body[field];
      }
    });

    if (req.files && req.files.length > 0) {
      const images = req.files.map(f => `/uploads/${f.filename}`);
      hotel.images = images;
      hotel.image = images[0];
    }

    const updatedHotel = await hotel.save();
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: 'Hotel yenilənmədi', error: err.message });
  }
};

// Hotel sil
export const deleteHotel = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Yanlış hotel ID' });
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel tapılmadı' });

    if (hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu əməliyyatı həyata keçirmək üçün səlahiyyətiniz yoxdur' });
    }

    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Hotel silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Hotel silinmədi', error: err.message });
  }
};



// user-ə aid otelləri gətir
export const getMyHotels = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'İstifadəçi məlumatı yoxdur' });
    }

    const myHotels = await Hotel.find({ owner: req.user.id });
    res.status(200).json({ data: myHotels });
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
};
