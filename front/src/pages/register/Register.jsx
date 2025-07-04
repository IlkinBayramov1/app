import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');  // yeni state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/api/auth/register', { username, email, password, role });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Qeydiyyat zamanı xəta baş verdi');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Qeydiyyat</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          İstifadəçi adı:
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
            style={{ width: '100%', marginBottom: 10 }}
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', marginBottom: 10 }}
          />
        </label>
        <label>
          Şifrə:
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', marginBottom: 10 }}
          />
        </label>

        <label>
          İstifadəçi növü:
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', marginBottom: 10 }}>
            <option value="user">Adi istifadəçi</option>
            <option value="owner">Otel sahibi</option>
          </select>
        </label>

        <button type="submit" style={{ width: '100%' }}>Qeydiyyat</button>
      </form>
    </div>
  );
}
