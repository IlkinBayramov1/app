import React, { useEffect, useState } from 'react';
import styles from './SectionTwo.module.css';
import axios from 'axios';

export default function SectionTwo() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);  // loading state əlavə olundu
  const [error, setError] = useState(null);      // xəta üçün əlavə etdik (istəyə bağlı)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/hotels');
        console.log(res.data); // 'data' adlı array gözlənilir
        setHotels(res.data.data); // otelləri set et
        setLoading(false);
      } catch (err) {
        console.error('Otellər alınmadı:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <p>Yüklənir...</p>;
  }

  if (error) {
    return <p>Xəta baş verdi: {error}</p>;
  }

  if (hotels.length === 0) {
    return <p>Heç bir otel tapılmadı.</p>;
  }

  return (
    <div className={styles.container}>
      {hotels.map(hotel => (
        <div key={hotel._id} className={styles.hotelCard}>
          <h3>{hotel.name}</h3>
          <p>{hotel.location}</p>
          <p>Qiymət: {hotel.pricePerNight}₼</p>
          <p>Reytinq: {hotel.rating || 'Yoxdur'}</p>
          <img src={hotel.image} alt={hotel.name} className={styles.hotelImage} />
        </div>
      ))}
    </div>
  );
}
