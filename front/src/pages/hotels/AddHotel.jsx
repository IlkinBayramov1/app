import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddHotel = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [availableRooms, setAvailableRooms] = useState('');
  const [description, setDescription] = useState('');
  const [photosUrls, setPhotosUrls] = useState('');
  const [photosFiles, setPhotosFiles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleFileChange = (e) => {
    setPhotosFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!token) {
      setError('Otel əlavə etmək üçün daxil olmalısınız');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', location);
      formData.append('pricePerNight', price);
      formData.append('availableRooms', availableRooms);
      formData.append('description', description);

      // Faylları əlavə et
      for (let i = 0; i < photosFiles.length; i++) {
        formData.append('images', photosFiles[i]);
      }

      // URL-ləri ayrıca açarla əlavə et
      if (photosUrls.trim()) {
        const urlArray = photosUrls.split(',').map(url => url.trim());
        formData.append('imageUrls', JSON.stringify(urlArray));
      }

      const res = await axios.post('http://localhost:2000/api/hotels', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Otel uğurla əlavə edildi');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Yeni Otel Əlavə Et</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Otel adı:</label><br />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Ünvan:</label><br />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Qiymət (AZN):</label><br />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Mövcud otaq sayı:</label><br />
          <input
            type="number"
            value={availableRooms}
            onChange={e => setAvailableRooms(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Açıqlama:</label><br />
          <textarea
            rows="3"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Hotel haqqında qısa məlumat"
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Şəkillər (Fayllar):</label><br />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Şəkillər (URL-ləri vergüllə ayırın):</label><br />
          <input
            type="text"
            value={photosUrls}
            onChange={e => setPhotosUrls(e.target.value)}
            placeholder="http://example.com/img1.jpg, http://example.com/img2.jpg"
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ marginTop: 20 }}>Əlavə et</button>
      </form>
    </div>
  );
};

export default AddHotel;
