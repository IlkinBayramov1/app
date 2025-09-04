import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OwnerProfile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setUsername(res.data.username || '');
        setEmail(res.data.email || '');
      } catch (err) {
        setMessage('Profil məlumatı yüklənərkən xəta baş verdi');
      }
    };

    fetchProfile();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        'http://localhost:2000/api/auth/profile',
        {
          username,
          email,
          password: password || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Profil uğurla yeniləndi!');
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      setMessage(err.response?.data?.message || 'Profil yenilənərkən xəta baş verdi');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Otel Sahibi Profilim</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Ad:</label><br />
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Yeni Şifrə (əgər dəyişmək istəyirsinizsə):</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: 20 }}>Profilimi Yenilə</button>
      </form>
    </div>
  );
}
