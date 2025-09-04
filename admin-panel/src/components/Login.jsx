import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:2000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // Ban statusu backend tərəfindən yoxlanırsa və 403 qaytarırsa, catch-ə düşəcək
      if (user.isBanned) {
        setError('Hesabınız banlanıb.');
        return;
      }

      localStorage.setItem('token', token);

      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        setError('Yalnız adminlər daxil ola bilər');
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError(err.response.data.message || 'Hesabınız banlanıb.');
      } else {
        setError(err.response?.data?.message || 'Xəta baş verdi');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Admin Panel Girişi</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Daxil ol</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
