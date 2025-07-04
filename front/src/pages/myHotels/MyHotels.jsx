import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
const token = localStorage.getItem('token');

const fetchMyHotels = async () => {
  try {
    const res = await axios.get('http://localhost:2000/api/hotels/my', {
      headers: {
        Authorization: `Bearer ${token}`,  // Token header-də düzgün göndərilir
      },
    });
    setHotels(res.data.data);
  } catch (err) {
    console.error('Otellər alınmadı:', err);
  }
};

    fetchMyHotels();
  }, []);

  if (loading) return <p>Yüklənir...</p>;
  if (hotels.length === 0) return <p>Sizin heç bir oteliniz yoxdur.</p>;

  return (
    <div style={{ maxWidth: 800, margin: 'auto' }}>
      <h2>Mənim Otellərim</h2>
      {hotels.map(hotel => (
        <div
          key={hotel._id}
          style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}
        >
          <h3>{hotel.name}</h3>
          <p>{hotel.location}</p>
          <p>Qiymət: {hotel.pricePerNight}₼</p>
          <p>Status: {hotel.status}</p>
          <img
            src={hotel.image}
            alt={hotel.name}
            width={200}
            style={{ marginTop: 10 }}
          />
        </div>
      ))}
    </div>
  );
}
