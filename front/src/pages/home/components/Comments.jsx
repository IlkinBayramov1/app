import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Comments({ hotelId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem('token');

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/api/comments/${hotelId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Yorumlar alınmadı:', err.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [hotelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Yorum yazmaq üçün əvvəlcə daxil olun.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:2000/api/comments',
        { hotelId, content, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContent('');
      setRating(5);
      setSuccess('Yorum uğurla əlavə edildi');
      setError(null);
      fetchComments();
    } catch (err) {
      setError(err.response?.data?.message || 'Yorum əlavə edilərkən xəta baş verdi');
      setSuccess(null);
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <h4>Yorumlar:</h4>
      {comments.length === 0 ? (
        <p>Hələ yorum yoxdur.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} style={{ border: '1px solid #ddd', padding: '8px', marginBottom: '6px' }}>
            <strong>{comment.user.username}</strong>: {comment.content}
            <br />
            ⭐ {comment.rating}/5
          </div>
        ))
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <h5>Yorum əlavə et</h5>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <textarea
          placeholder="Yorum yaz..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={3}
          style={{ width: '100%', marginBottom: '8px' }}
        />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
          <option value={5}>⭐ 5</option>
          <option value={4}>⭐ 4</option>
          <option value={3}>⭐ 3</option>
          <option value={2}>⭐ 2</option>
          <option value={1}>⭐ 1</option>
        </select>
        <br />
        <button type="submit" style={{ marginTop: '6px' }}>Yorum əlavə et</button>
      </form>
    </div>
  );
}
