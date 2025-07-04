import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FavoriteHotels() {
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(res.data.map(f => f.hotel || f)); // bəzən .hotel içində olur
      } catch (err) {
        console.error('Favoritlər alınmadı:', err.message);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Favori Otellərim</h2>
      {favorites.length === 0 ? (
        <p>Heç bir favorit otel yoxdur.</p>
      ) : (
        <div>
          {favorites.map(hotel => (
            <div key={hotel._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>Qiymət: {hotel.pricePerNight}₼</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
