// /src/components/FavoriteButton.jsx
import React, { useEffect, useState } from 'react';

const FavoriteButton = ({ hotel }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav._id === hotel._id));
  }, [hotel]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav._id !== hotel._id);
    } else {
      updatedFavorites = [...favorites, hotel];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? '❌ Favoridən sil' : '❤️ Favoriyə əlavə et'}
    </button>
  );
};

export default FavoriteButton;
