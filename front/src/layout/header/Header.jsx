import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // localStorage-dan istifadəçi məlumatını götürürük
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    // Token və istifadəçi məlumatlarını sil və login səhifəsinə yönləndir
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.innerContainer}>
        <h1>
          <Link to="/" className={styles.logo}>
            Baytend
          </Link>
        </h1>

        {/* Naviqasiya menyusu */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li><Link to="/">Ana Səhifə</Link></li>
            <li><Link to="/favorites">Favorilərim</Link></li>
            <li><Link to="/contact">Əlaqə</Link></li>

            {user ? (
              <>
                <li><strong>{user.username || user.email}</strong></li>
                <li><Link to="/profile/edit">Profilim</Link></li>
                {user.role === 'owner' && (
                  <li><Link to="/add-hotel">Otel Əlavə Et</Link></li>
                )}
                <li>
                  <button onClick={handleLogout} className={styles.logoutBtn}>Çıxış</button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Giriş</Link></li>
                <li><Link to="/register/user">İstifadəçi Qeydiyyatı</Link></li>
                <li><Link to="/register/owner">Otel Sahibi Qeydiyyatı</Link></li>
              </>
            )}
          </ul>
        </nav>

        {/* Burger icon - mobil üçün */}
        <div
          className={styles.burger}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menyu aç/bağla"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter') setIsMenuOpen(!isMenuOpen); }}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
}
