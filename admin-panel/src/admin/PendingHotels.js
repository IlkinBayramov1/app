import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PendingHotels.css';

const PendingHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingHotels = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:2000/api/admin/hotels/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHotels(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Pending otellər alınmadı:', err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingHotels();
  }, []);

  const handleApprove = async (hotelId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:2000/api/admin/hotels/${hotelId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Otel təsdiqləndi');
      fetchPendingHotels(); // siyahını yenilə
    } catch (err) {
      console.error('Otel təsdiqlənmədi:', err.message);
      alert('Xəta baş verdi');
    }
  };

  const handleReject = async (hotelId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:2000/api/admin/hotels/${hotelId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Otel imtina edildi');
      fetchPendingHotels(); // siyahını yenilə
    } catch (err) {
      console.error('Otel imtina edilmədi:', err.message);
      alert('Xəta baş verdi');
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (hotels.length === 0) return <p>Pending otel yoxdur</p>;

  return (
    <div className="pending-hotels-container">
      <h1 className="pending-hotels-title">Pending Otellər</h1>
      <ul className="pending-hotels-list">
        {hotels.map(hotel => (
          <li key={hotel._id}>
            <span>{hotel.name}</span>
            <div className="button-group">
              <button
                onClick={() => handleApprove(hotel._id)}
                className="btn-approve"
              >
                Təsdiqlə
              </button>
              <button
                onClick={() => handleReject(hotel._id)}
                className="btn-reject"
              >
                İmtina et
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingHotels;
