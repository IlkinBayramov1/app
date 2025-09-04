import React, { useEffect, useState } from 'react';
import HotelCard from '../../components/HotelCard';
import styles from './FavoriteHotels.module.css';

const FavoriteHotels = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(hotel => hotel._id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favori Otellərim</h1>
      {favorites.length === 0 ? (
        <p className={styles.noFavoritesMsg}>Favori oteliniz yoxdur.</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map(hotel => (
            <div key={hotel._id} className={styles.hotelWrapper}>
              <HotelCard hotel={hotel} />
              <button 
                onClick={() => removeFavorite(hotel._id)} 
                className={styles.removeBtn}
                title="Favoridən sil"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteHotels;
