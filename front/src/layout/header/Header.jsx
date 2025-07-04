import React from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  // localStorage-dan istifadəçi məlumatını oxu
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Logout funksiyası (istəyə bağlı)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <h1>
        <Link to="/" className={styles.logo}>
          Baytend
        </Link>
      </h1>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/">Ana Səhifə</Link></li>
          <li><Link to="/favorites">Favorilərim</Link></li>

          {user ? (
            <>
              <li style={{ marginLeft: '10px' }}>
                <strong>{user.username}</strong>
              </li>
              <li>
                <Link to="/profile/edit">Profilim</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit',
                    textDecoration: 'underline'
                  }}
                >
                  Çıxış
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Giriş</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}
