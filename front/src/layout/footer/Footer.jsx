import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.linksGroup}>
          <h4>Baytend</h4>
          <ul>
            <li><a href="/about">Haqqımızda</a></li>
            <li><a href="/contact">Əlaqə</a></li>
            <li><a href="/terms">İstifadə Şərtləri</a></li>
            <li><a href="/privacy">Məxfilik Siyasəti</a></li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4>Kömək</h4>
          <ul>
            <li><a href="/faq">Tez-tez verilən suallar</a></li>
            <li><a href="/support">Dəstək</a></li>
            <li><a href="/booking-help">Rezervasiya Yardımı</a></li>
          </ul>
        </div>

        <div className={styles.linksGroup}>
          <h4>Sosial Media</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>&copy; 2025 Baytend. Bütün hüquqlar qorunur.</p>
        <p>Saytımızda istifadəçi məlumatları ən yüksək təhlükəsizlik standartlarına uyğun qorunur.</p>
      </div>
    </footer>
  );
}
