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

// ✅ Yeni hotel əlavə et
export const createHotel = async (req, res) => {
  try {
    const newHotel = new Hotel({
      ...req.body,
      owner: req.user.id, // Burada otelə daxil olan istifadəçi "owner" kimi təyin olunur
    });

    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(500).json({ message: 'Hotel əlavə edilə bilmədi', error: err.message });
  }
};


// ✅ Bütün hotelleri gətir
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Hotel siyahısı alınmadı', error: err.message });
  }
};

// ✅ ID ilə hotel tap
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel tapılmadı' });
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
};

// ✅ Hotel məlumatını yenilə
export const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // burada `images: [...]` göndərilə bilər
      { new: true }
    );
    if (!updatedHotel) return res.status(404).json({ message: 'Hotel tapılmadı' });
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: 'Hotel yenilənmədi', error: err.message });
  }
};

// ✅ Hotel sil
export const deleteHotel = async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ message: 'Hotel tapılmadı' });
    res.status(200).json({ message: 'Hotel silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Hotel silinmədi', error: err.message });
  }
};
