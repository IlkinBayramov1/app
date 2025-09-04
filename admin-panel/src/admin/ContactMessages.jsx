import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:2000/api/contact', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Mesajlar alınarkən xəta:', err);
      setLoading(false);
    }
  };

  const markAsSeen = async (id) => {
    try {
      await axios.patch(`http://localhost:2000/api/contact/${id}/seen`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMessages();
    } catch (err) {
      console.error('Mark as seen xətası:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p>Yüklənir...</p>;

  return (
    <div>
      <h2>Əlaqə Mesajları</h2>
      {messages.length === 0 && <p>Mesaj yoxdur.</p>}
      <ul>
        {messages.map(msg => (
          <li key={msg._id} style={{ marginBottom: '15px', backgroundColor: msg.seen ? '#e0e0e0' : '#fff' }}>
            <p><strong>Ad:</strong> {msg.name}</p>
            <p><strong>Email:</strong> {msg.email}</p>
            <p><strong>Mesaj:</strong> {msg.message}</p>
            <p><strong>Status:</strong> {msg.seen ? 'Görülüb' : 'Yeni'}</p>
            {!msg.seen && (
              <button onClick={() => markAsSeen(msg._id)}>Görülmüş kimi işarə et</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactMessages;
