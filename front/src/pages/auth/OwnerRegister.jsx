import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './OwnerRegister.module.css';

const OwnerRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Şifrələr uyğun deyil');
      return;
    }

    try {
      const res = await axios.post('http://localhost:2000/api/auth/register', {
        username, // 💡 əlavə olundu
        email,
        password,
        role: 'owner',
      });

      if (res.status === 201) {
        alert('Qeydiyyat uğurludur. İndi daxil ola bilərsiniz.');
        navigate('/login');
      } else {
        setError(res.data.message || 'Qeydiyyat uğursuz oldu');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Xəta baş verdi');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Otel Sahibi Qeydiyyatı</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>İstifadəçi adı:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            placeholder="İstifadəçi adınızı daxil edin"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Şifrə:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div>
          <label>Şifrəni təsdiqlə:</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            minLength={6}
          />
        </div>
        {error && <p className={styles.errorMsg}>{error}</p>}
        <button type="submit">Qeydiyyatdan keç</button>
      </form>
    </div>
  );
};

export default OwnerRegister;
