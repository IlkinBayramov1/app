// import Hotel from '../models/hotel.js';

// // ✅ Otel əlavə et
// export const createHotel = async (req, res) => {
//   try {
//     const hotel = new Hotel(req.body);
//     await hotel.save();
//     res.status(201).json(hotel);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // ✅ Bütün otelləri al
// export const getAllHotels = async (req, res) => {
//   try {
//     const hotels = await Hotel.find();
//     res.status(200).json(hotels);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Tək oteli id ilə al
// export const getHotelById = async (req, res) => {
//   try {
//     const hotel = await Hotel.findById(req.params.id);
//     if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
//     res.status(200).json(hotel);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Oteli sil
// export const deleteHotel = async (req, res) => {
//   try {
//     const hotel = await Hotel.findByIdAndDelete(req.params.id);
//     if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
//     res.status(200).json({ message: 'Hotel deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ Oteli yenilə
// export const updateHotel = async (req, res) => {
//   try {
//     const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
//     res.status(200).json(hotel);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
import Hotel from '../models/hotel.js';
import mongoose from 'mongoose';

// Yeni hotel əlavə et
export const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel({
      ...req.body,
      owner: req.user.id, // Otel sahibi kimi təyin et
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

    // Filtrləri qur
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

// Hotel məlumatını yenilə (yalnız otel sahibi yeniləyə bilər)
export const updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel tapılmadı' });

    if (hotel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu əməliyyatı həyata keçirmək üçün səlahiyyətiniz yoxdur' });
    }

    // Update data (images sahəsini də qəbul edir)
    Object.assign(hotel, req.body);

    const updatedHotel = await hotel.save();

    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: 'Hotel yenilənmədi', error: err.message });
  }
};

// Hotel sil (yalnız sahibi silə bilər)
export const deleteHotel = async (req, res) => {
  try {
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
