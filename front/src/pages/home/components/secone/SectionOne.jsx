import React from 'react';
import styles from './SectionOne.module.css';
import { Link } from 'react-router-dom';  // React Router linki istifadə edirik

export default function SectionOne() {
  return (
    <section className={styles.section}>
      <div className={styles.leftSide}>
        <h2>Baytend-ə xoş gəlmisiniz!</h2>
        <p>Ən yaxşı otelləri tapın və rahatlıqla rezervasiya edin.</p>
      </div>
      <div className={styles.rightSide}>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/register" className={styles.link}>Register</Link>
      </div>
    </section>
  );
}
