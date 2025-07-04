import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from './home/components/Comments';

export default function HotelDetails() {
  const { id } = useParams();  // URL-dən otel ID-si gəlir
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:2000/api/hotels/${id}`);
        setHotel(res.data);
      } catch (err) {
        console.error('Otel məlumatı alınmadı', err);
      }
    };
    fetchHotel();
  }, [id]);

  if (!hotel) return <p>Yüklənir...</p>;

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <p>Qiymət: {hotel.pricePerNight}₼</p>
      <p>Ünvan: {hotel.location}</p>
      <p>Boş otaqlar: {hotel.availableRooms}</p>

      <Comments hotelId={hotel._id} />
    </div>
  );
}
