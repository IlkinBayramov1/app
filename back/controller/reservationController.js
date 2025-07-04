import Reservation from '../models/reservation.js';
import Hotel from '../models/hotel.js';

// 1) Yeni rezervasiya 
export const createReservation = async (req, res) => {
  try {
    const { hotel, checkIn, checkOut, guests } = req.body;
    const user = req.user.id;

    // Oteli tap
    const foundHotel = await Hotel.findById(hotel);
    if (!foundHotel) {
      return res.status(404).json({ message: 'Hotel tapılmadı' });
    }

    // Boş otaqların kifayətliliyini yoxla
    if (foundHotel.availableRooms < guests) {
      return res.status(400).json({ message: 'Kifayət qədər boş otaq yoxdur' });
    }

    // Tarixlərin düzgün formatda olub-olmadığını yoxla
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ message: 'Tarixlər düzgün formatda deyil' });
    }

    // Check-out check-in-dən sonra olmalıdır
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: 'Check-out tarixi check-in tarixindən sonra olmalıdır' });
    }

    // Rezervasiyanı yarat
    const reservation = new Reservation({
      hotel,
      user,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
    });

    await reservation.save();

    // Oteldə boş otaq sayını azaldırıq
    foundHotel.availableRooms -= guests;
    await foundHotel.save();

    res.status(201).json({ message: 'Rezervasiya uğurla yaradıldı', reservation });
  } catch (err) {
    res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
  }
};


// 2) İstifadəçinin öz rezervasiyaları
export const getUserReservations = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservations = await Reservation.find({ user: userId })
      .populate('hotel', 'name location image pricePerNight') // hotel detalları
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Rezervasiyalar alınarkən xəta baş verdi', error: err.message });
  }
};

// 3) Otel sahibinin otelinə edilən rezervasiyalar
export const getOwnerReservations = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const ownerHotels = await Hotel.find({ owner: ownerId }).select('_id');
    const hotelIds = ownerHotels.map(hotel => hotel._id);

    const reservations = await Reservation.find({ hotel: { $in: hotelIds } })
      .populate('hotel', 'name location')
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Rezervasiyalar alınarkən xəta baş verdi', error: err.message });
  }
};


// DELETE /api/reservations/:id
export const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Rezervasiya tapılmadı' });

    if (reservation.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Bu rezervasiyanı silmək hüququnuz yoxdur' });
    }

    // Otaqları geri qaytar
    const hotel = await Hotel.findById(reservation.hotel);
    hotel.availableRooms += reservation.guests;
    await hotel.save();

    await reservation.deleteOne();

    res.status(200).json({ message: 'Rezervasiya ləğv edildi' });
  } catch (err) {
    res.status(500).json({ message: 'Ləğv olunarkən xəta baş verdi', error: err.message });
  }
};
