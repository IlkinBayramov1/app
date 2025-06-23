// import User from '../models/user.js';
// import Hotel from '../models/hotel.js';
// // Əgər rezervasiya modeli də varsa, onu da import et

// export const getAdminStats = async (req, res) => {
//   try {
//     const userCount = await User.countDocuments();
//     const hotelCount = await Hotel.countDocuments();
//     // const bookingCount = await Booking.countDocuments(); // varsa əlavə et

//     res.status(200).json({
//       userCount,
//       hotelCount,
//       // bookingCount
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Statistikalar alınmadı', error: err.message });
//   }
// };


import User from '../models/user.js';
import Hotel from '../models/hotel.js';

// 👥 Bütün istifadəçiləri gətir
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'İstifadəçilər alınmadı' });
  }
};

// 🔴 İstifadəçini sil
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'İstifadəçi silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Silinmə zamanı xəta' });
  }
};

// 🏨 Bütün otelləri admin üçün gətir
export const getAllHotelsAdmin = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Otellər alınmadı' });
  }
};

// 🔴 Oteli sil
export const deleteHotelAdmin = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Hotel silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Silinmə zamanı xəta' });
  }
};

// adminController.js
export const getAdminStats = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const hotelsCount = await Hotel.countDocuments();

    res.status(200).json({
      users: usersCount,
      hotels: hotelsCount,
    });
  } catch (err) {
    res.status(500).json({ message: 'Statistika alınmadı' });
  }
};
