import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FavoriteButton({ hotelId }) {
  const token = localStorage.getItem('token');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const already = res.data.some(fav => fav.hotel._id === hotelId);
        setIsFavorite(already);
      } catch (err) {
        console.error('Favoritləri yoxlamaq mümkün olmadı:', err.message);
      }
    };

    if (token) {
      checkFavorite();
    }
  }, [hotelId, token]);

  const handleClick = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:2000/api/favorites/${hotelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsFavorite(false);
      } else {
        await axios.post(
          'http://localhost:2000/api/favorites',
          { hotelId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Favorit əlavə/sil zamanı xəta:', err.message);
    }
  };

  return (
    <button onClick={handleClick}>
      {isFavorite ? '❤️ Favoridədir' : '🤍 Favoriyə əlavə et'}
    </button>
  );
}
