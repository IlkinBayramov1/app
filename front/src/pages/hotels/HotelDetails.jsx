import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';
import BookingForm from '../../components/BookingForm'; // Rezervasiya forması

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Otel məlumatlarını gətir
  const fetchHotel = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/api/hotels/${id}`);
      setHotel(res.data);
    } catch (err) {
      console.error('Otel tapılmadı:', err);
      setError('Otel tapılmadı');
    } finally {
      setLoading(false);
    }
  };

  // Şərhləri gətir
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/api/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('Şərhlər yüklənmədi:', err);
    }
  };

  // Komponent yükləndikdə datanı gətir
  useEffect(() => {
    setLoading(true);
    fetchHotel();
    fetchComments();
  }, [id]);

  // Yeni şərh əlavə edildikdə şərhləri yenilə
  const handleCommentAdded = () => {
    fetchComments();
  };

  // Yüklənmə və xəta halları
  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: 'auto' }}>
      <h2>{hotel.name}</h2>

      {hotel.images?.length > 0 && (
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          style={{
            width: '100%',
            maxWidth: 600,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />
      )}

      <p><strong>Location:</strong> {hotel.location}</p>
      <p><strong>Price Per Night:</strong> {hotel.pricePerNight} AZN</p>
      <p><strong>Rating:</strong> {hotel.rating ? hotel.rating.toFixed(1) : '0.0'} / 5</p>
      <p>{hotel.description || 'Açıqlama yoxdur'}</p>

      {/* Rezervasiya formu */}
      <div style={{ marginTop: 30, marginBottom: 30 }}>
        <BookingForm hotelId={id} />
      </div>

      {/* Şərhlər */}
      <h3>Şərhlər</h3>
      <CommentForm hotelId={id} onCommentAdded={handleCommentAdded} />
      <CommentList comments={comments} />
    </div>
  );
};

export default HotelDetails;
