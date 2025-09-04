import React, { useState, useEffect } from 'react';
import styles from './HotelCard.module.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const HotelCard = ({ hotel, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(h => h._id === hotel._id));
  }, [hotel._id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updated = favorites.filter(h => h._id !== hotel._id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(hotel);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
<div className={styles.card} onClick={onClick} style={{ cursor: 'pointer', position: 'relative' }}>
  <img src={hotel.image || 'default-image.jpg'} alt={hotel.name} className={styles.image} />
  <h3>{hotel.name}</h3>
  <p>{hotel.location}</p>
  <p>Qiymət: {hotel.pricePerNight} AZN</p>

  {/* Ürək ikonu ən aşağıda */}
  <div className={styles.heartWrapper}>
    <button
      className={styles.heartIcon}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite();
      }}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  </div>
</div>

  );
};

export default HotelCard;
