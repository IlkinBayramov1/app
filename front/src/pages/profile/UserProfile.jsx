import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');  // Yeni state
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setUsername(res.data.username || '');
        setEmail(res.data.email || '');
        setPhone(res.data.phone || '');  // telefon məlumatını da doldur
      } catch (err) {
        setMessage('Profil yüklənə bilmədi');
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
          phone,  // backend-ə göndəririk
          password: password || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage('Profil yeniləndi!');
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      setMessage(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h2>Profilim</h2>
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
          <label>Telefon:</label><br />
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="+994 XX XXX XX XX"
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

        <button type="submit" style={{ marginTop: 20 }}>Yenilə</button>
      </form>
    </div>
  );
}
