import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Zəhmət olmasa əvvəlcə giriş edin.');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:2000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError('Profil məlumatı alınarkən xəta baş verdi');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Profil Məlumatları</h2>
      <p><strong>İstifadəçi adı:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Telefon:</strong> {user.phone || 'Yoxdur'}</p>
      <p><strong>Rol:</strong> {user.role}</p>
    </div>
  );
}
