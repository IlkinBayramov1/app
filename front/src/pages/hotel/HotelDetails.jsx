import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function HotelDetails() {
  const { id } = useParams(); // URL-dən hotel ID-ni alırıq
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/api/hotels/${id}`);
        setHotel(res.data);
      } catch (err) {
        setError('Otel tapılmadı');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{hotel.name}</h2>
      <img src={hotel.image} alt={hotel.name} width="300" />
      <p>Ünvan: {hotel.location}</p>
      <p>Qiymət: {hotel.pricePerNight}₼</p>
      <p>Boş otaqlar: {hotel.availableRooms}</p>
      <p>Reytinq: {hotel.rating}</p>

      {/* Yorum komponenti */}
      <Comments hotelId={hotel._id} />

      {/* Rezervasiya formu komponenti */}
      <ReservationForm hotelId={hotel._id} />
    </div>
  );
}
