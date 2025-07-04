// controller/favoriteController.js
import Favorite from '../models/favorite.js';

export const addFavorite = async (req, res) => {
  try {
    const user = req.user.id;
    const { hotelId } = req.body;

    const alreadyExists = await Favorite.findOne({ user, hotel: hotelId });
    if (alreadyExists) {
      return res.status(400).json({ message: 'Bu otel artıq favoritlərə əlavə edilib' });
    }

    const favorite = await Favorite.create({ user, hotel: hotelId });
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ message: 'Favorit əlavə edilərkən xəta baş verdi', error: err.message });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const user = req.user.id;
    const favorites = await Favorite.find({ user }).populate('hotel');
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Favoritlər alınarkən xəta baş verdi', error: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const user = req.user.id;
    const { hotelId } = req.params;

    const favorite = await Favorite.findOneAndDelete({ user, hotel: hotelId });
    if (!favorite) {
      return res.status(404).json({ message: 'Favorit tapılmadı' });
    }

    res.status(200).json({ message: 'Favoritdən silindi' });
  } catch (err) {
    res.status(500).json({ message: 'Favorit silinərkən xəta baş verdi', error: err.message });
  }
};
