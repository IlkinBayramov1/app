import React, { useState } from 'react';
import axios from 'axios';

export default function ReservationForm({ hotelId }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/api/reservations', {
        hotel: hotelId,
        checkIn,
        checkOut,
        guests
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('Rezervasiya uğurla edildi!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Rezervasiya et</h3>
      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
      <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
      <input type="number" value={guests} onChange={e => setGuests(e.target.value)} min="1" required />
      <button type="submit">Rezervasiya et</button>
      {message && <p>{message}</p>}
    </form>
  );
}
