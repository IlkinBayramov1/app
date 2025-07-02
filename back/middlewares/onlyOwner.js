import Hotel from '../models/hotel.js';

export const onlyOwner = async (req, res, next) => {
  try {
    const hotelId = req.params.id || req.body.hotelId;
    const userId = req.user.id;

    if (!hotelId) {
      return res.status(400).json({ message: 'Hotel ID verilməyib' });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel tapılmadı' });
    }

    if (hotel.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Bu əməliyyatı etmək üçün səlahiyyətiniz yoxdur' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server xətası', error: error.message });
  }
};
