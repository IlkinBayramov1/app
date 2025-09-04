import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelCard from '../../components/HotelCard';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import AboutSection from '../../components/AboutSection';
import OpeningHours from '../../components/OpeningHours/OpeningHours';
import FilterSort from '../../components/FilterSort/FilterSort';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [featuredHotel, setFeaturedHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchHotels = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/hotels');
        if (isMounted) {
          const hotelsData = res.data.data || res.data;
          setHotels(hotelsData);
          setFilteredHotels(hotelsData);

          if (hotelsData.length > 0) {
            setFeaturedHotel(hotelsData[0]);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Otellər yüklənərkən xəta baş verdi');
          setLoading(false);
        }
      }
    };

    fetchHotels();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFilter = ({ minPrice, maxPrice, minRating }) => {
    let filtered = [...hotels];

    if (minPrice !== null) {
      filtered = filtered.filter(hotel => hotel.pricePerNight >= minPrice);
    }

    if (maxPrice !== null) {
      filtered = filtered.filter(hotel => hotel.pricePerNight <= maxPrice);
    }

    if (minRating !== null) {
      filtered = filtered.filter(hotel => hotel.rating >= minRating);
    }

    setFilteredHotels(filtered);
  };

  if (loading) return <p className={styles.loading}>Yüklənir...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Otel Siyahısı</h1>

      <FilterSort onFilter={handleFilter} />

      {filteredHotels.length === 0 ? (
        <p className={styles.message}>Hal-hazırda otel yoxdur.</p>
      ) : (
        <div className={styles.hotelList}>
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              onClick={() => navigate(`/hotels/${hotel._id}`)}
            />
          ))}
        </div>
      )}

      <OpeningHours />
      {featuredHotel && <AboutSection featuredHotel={featuredHotel} />}
    </div>
  );
};

export default Home;
