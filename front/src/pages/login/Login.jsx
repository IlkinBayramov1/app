import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:2000/api/auth/login', {
                email,
                password,
            });

            const { token, user } = res.data;

            // Token və istifadəçi məlumatını yadda saxla
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Əgər istifadəçi owner-dirsə, əvvəlcə otellərinə bax
            if (user.role === 'owner') {
                const hotelRes = await axios.get('http://localhost:2000/api/hotels/my', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (hotelRes.data.data.length > 0) {
                    navigate('/my-hotels');  // varsa otellər, səhifəyə yönləndir
                } else {
                    navigate('/add-hotel');  // yoxdursa, yeni otel əlavə səhifəsinə
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login zamanı xəta baş verdi');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', marginBottom: 10 }}
                    />
                </label>
                <button type="submit" style={{ width: '100%' }}>
                    Giriş
                </button>
            </form>
        </div>
    );
}
