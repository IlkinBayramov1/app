import Reservation from '../models/reservation.js';
import Hotel from '../models/hotel.js';

// Yeni rezervasiya yarat
export const createReservation = async (req, res) => {
    try {
        const { hotel, checkIn, checkOut, guests } = req.body;
        const user = req.user.id;

        const foundHotel = await Hotel.findById(hotel);
        if (!foundHotel) {
            return res.status(404).json({ message: 'Hotel tapılmadı' });
        }

        if (foundHotel.availableRooms < guests) {
            return res.status(400).json({ message: 'Kifayət qədər boş otaq yoxdur' });
        }

        const reservation = new Reservation({
            hotel,
            user,
            checkIn,
            checkOut,
            guests,
        });

        await reservation.save();

        // Otaq sayını azaldırıq
        foundHotel.availableRooms -= guests;
        await foundHotel.save();

        res.status(201).json({ message: 'Rezervasiya uğurla yaradıldı', reservation });
    } catch (err) {
        res.status(500).json({ message: 'Xəta baş verdi', error: err.message });
    }
};


// İstifadəçinin bütün rezervasiyaları
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
