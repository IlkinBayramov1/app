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
import Reservation from '../models/reservation.js';

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

// 📊 Admin statistikaları gətir
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

// 📊 Dashboard üçün statistikalar
export const getDashboardStats = async (req, res) => {
  try {
    const [userCount, hotelCount, reservationCount] = await Promise.all([
      User.countDocuments(),
      Hotel.countDocuments(),
      Reservation.countDocuments(),
    ]);

    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
      };
    }).reverse();

    const userStats = await Promise.all(last7Days.map(async ({ date }) => {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      const count = await User.countDocuments({
        createdAt: {
          $gte: new Date(date),
          $lt: nextDay,
        },
      });
      return { date, count };
    }));

    const hotelStats = await Promise.all(last7Days.map(async ({ date }) => {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      const count = await Hotel.countDocuments({
        createdAt: {
          $gte: new Date(date),
          $lt: nextDay,
        },
      });
      return { date, count };
    }));

    const topHotels = await Hotel.find()
      .sort({ rating: -1 })
      .limit(5)
      .select('name rating');

    res.status(200).json({
      totals: {
        users: userCount,
        hotels: hotelCount,
        reservations: reservationCount,
      },
      dailyStats: {
        users: userStats,
        hotels: hotelStats,
      },
      topHotels,
    });
  } catch (err) {
    res.status(500).json({ message: 'Statistika alınmadı', error: err.message });
  }
};

// 🔄 İstifadəçinin ban statusunu dəyişdir
export const toggleBanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'İstifadəçi tapılmadı' });

    user.isBanned = !user.isBanned; // true ↔ false
    await user.save();

    res.status(200).json({
      message: `İstifadəçi ${user.isBanned ? 'ban olundu' : 'banı qaldırıldı'}`,
      isBanned: user.isBanned,
    });
  } catch (err) {
    res.status(500).json({ message: 'Ban əməliyyatı zamanı xəta' });
  }
};

// ⏳ Pending statuslu otelləri gətir
export const getPendingHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ status: 'pending' });
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Pending otellər alınmadı' });
  }
};

// ✔️ Otel təsdiqlə
export const approveHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.status(200).json({ message: 'Hotel təsdiqləndi', hotel });
  } catch (err) {
    res.status(500).json({ message: 'Təsdiqləmə zamanı xəta' });
  }
};

// ❌ Otel rədd et
export const rejectHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.status(200).json({ message: 'Hotel rədd edildi', hotel });
  } catch (err) {
    res.status(500).json({ message: 'Rədd etmə zamanı xəta' });
  }
};

// 🔒 İstifadəçini blokla
export const banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }

    res.status(200).json({ message: 'İstifadəçi bloklandı', user });
  } catch (err) {
    res.status(500).json({ message: 'Bloklama zamanı xəta', error: err.message });
  }
};

// 🔓 İstifadəçini aktivləşdir
export const unbanUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }

    res.status(200).json({ message: 'İstifadəçi aktivləşdirildi', user });
  } catch (err) {
    res.status(500).json({ message: 'Aktivləşdirmə zamanı xəta', error: err.message });
  }
};
