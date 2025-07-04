import React, { useState } from 'react';
import axios from 'axios';

export default function AddHotel() {
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    pricePerNight: '',
    description: '',
    availableRooms: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!token) {
    return (
      <p>
        Otel əlavə etmək üçün əvvəlcə{' '}
        <a href="/login" style={{ color: 'blue' }}>giriş edin</a>.
      </p>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    try {
      await axios.post('http://localhost:2000/api/hotels', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Otel əlavə edildi');
      setFormData({
        name: '',
        location: '',
        pricePerNight: '',
        description: '',
        availableRooms: '',
      });
      setImages([]);
    } catch (err) {
      setError('Otel əlavə edilərkən xəta baş verdi');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Yeni Otel Əlavə Et</h2>
      <input
        name="name"
        placeholder="Otel adı"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Ünvan"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="pricePerNight"
        placeholder="Gecəlik qiymət"
        value={formData.pricePerNight}
        onChange={handleChange}
        required
        min="0"
      />
      <textarea
        name="description"
        placeholder="Təsvir"
        value={formData.description}
        onChange={handleChange}
        required
        rows={4}
      />
      <input
        type="number"
        name="availableRooms"
        placeholder="Boş otaqlar sayı"
        value={formData.availableRooms}
        onChange={handleChange}
        required
        min="0"
      />
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Yüklənir...' : 'Əlavə et'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
