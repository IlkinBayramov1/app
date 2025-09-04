import React from 'react';
import styles from './OpeningHours.module.css';

const OpeningHours = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📅 Otelin İş Saatları</h2>
      <p className={styles.subtitle}>
        Aşağıdakı cədvəldə otelimizin həftəlik açılış və bağlanış saatları qeyd olunub:
      </p>
      <ul className={styles.list}>
        <li>
          <strong>Bazar ertəsi – Cümə:</strong> 09:00 – 22:00 <span>(normal iş saatları)</span>
        </li>
        <li>
          <strong>Şənbə:</strong> 10:00 – 20:00 <span>(qısaldılmış iş günü)</span>
        </li>
        <li>
          <strong>Bazar:</strong> Bağlıdır <span>(istirahət günü)</span>
        </li>
      </ul>
      <p className={styles.note}>
        📞 Əlavə məlumat və rezervasiya üçün müştəri xidmətlərimizlə əlaqə saxlayın.
      </p>
    </div>
  );
};

export default OpeningHours;
