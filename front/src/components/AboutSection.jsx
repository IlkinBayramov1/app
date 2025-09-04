import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutSection.module.css';

const AboutSection = ({ featuredHotel }) => {
  const imageUrl =
    featuredHotel && featuredHotel.images && featuredHotel.images.length > 0
      ? featuredHotel.images[0]
      : 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/a0/c2/cf/hilton-baku.jpg?w=900&h=500&s=1';

  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <h2 className={styles.title}>Baytend – Şəhərin Ən Yaxşı Otellərini Kəşf Edin</h2>
        
        <p className={styles.paragraph}>
          Baytend ilə siz şəhərin ən yaxşı otellərini asanlıqla tapıb rezervasiya edə bilərsiniz.
          Bizim geniş seçimlərimiz, etibarlı istifadəçi rəyləri və rahat interfeysimiz sayəsində
          otel axtarışı artıq çox asandır.
        </p>
        
        <p className={styles.paragraph}>
          İstər iş səfəri, istərsə də istirahət üçün səyahət edirsinizsə, Baytend sizin üçün ən doğru seçimdir.
          Rahat və sürətli rezervasiya sistemi, real vaxtda otaq mövcudluğu və müxtəlif qiymət kateqoriyaları ilə
          sizə uyğun oteli tapmaq heç vaxt bu qədər rahat olmayıb.
        </p>

        <p className={styles.paragraph}>
          Bizim missiyamız müştərilərimizə ən yüksək səviyyədə xidmət göstərmək və səyahətinizi unudulmaz etməkdir.
          Baytend ilə hər zaman ən yaxşı qiymətlər, eksklüziv təkliflər və xüsusi endirimlər əldə edin!
        </p>

        {featuredHotel && (
          <div className={styles.featuredHotel}>
            <h3 className={styles.featuredTitle}>Seçilmiş Otel:</h3>
            <Link to={`/hotels/${featuredHotel._id}`} className={styles.hotelLink}>
              {featuredHotel.name}
            </Link>
            <p className={styles.hotelDescription}>{featuredHotel.description}</p>
          </div>
        )}
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={featuredHotel ? featuredHotel.name : 'Hilton Baku'}
          className={styles.featuredImage}
        />
      </div>
    </section>
  );
};

export default AboutSection;
