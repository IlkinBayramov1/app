import React, { useState } from 'react';
import styles from './Contact.module.css';
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!name || !email || !message) {
      setError('Zəhmət olmasa bütün xanaları doldurun.');
      return;
    }

    try {
      await axios.post('http://localhost:2000/api/contact', {
        name,
        email,
        message,
      });
      setSuccess('Mesajınız uğurla göndərildi!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Mesaj göndərilərkən xəta baş verdi.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📬 Bizimlə Əlaqə</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Ad Soyad:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Mesajınız:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textarea}
          rows={5}
          required
        ></textarea>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.button}>Göndər</button>
      </form>
    </div>
  );
};

export default Contact;
