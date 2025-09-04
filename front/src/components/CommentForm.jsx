import React, { useState } from 'react';
import axios from 'axios';
import styles from './CommentForm.module.css';

const CommentForm = ({ hotelId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Yorum yazmaq üçün daxil olun');
      return;
    }

    try {
      await axios.post('http://localhost:2000/api/comments', {
        hotelId,
        content,
        rating
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setContent('');
      setRating(5);
      onCommentAdded();
    } catch (err) {
      console.error('Yorum əlavə olunmadı');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        placeholder="Şərhinizi yazın..."
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        rows={4}
        className={styles.textarea}
      />
      <label className={styles.label}>
        Reytinq:
        <select 
          value={rating} 
          onChange={e => setRating(Number(e.target.value))}
          className={styles.select}
        >
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <button type="submit" className={styles.button}>Göndər</button>
    </form>
  );
};

export default CommentForm;
