import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:2000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Statistika alınmadı:', err.message);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Yüklənir...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📊 Admin Panel – Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700">👥 İstifadəçilər</h2>
          <p className="text-3xl font-bold">{stats.totals.users}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700">🏨 Otellər</h2>
          <p className="text-3xl font-bold">{stats.totals.hotels}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700">🛏️ Rezervasiyalar</h2>
          <p className="text-3xl font-bold">{stats.totals.reservations}</p>
        </div>
      </div>

      {/* Top otellər */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">⭐ Ən yüksək reytinqli otellər</h2>
        <ul className="space-y-2">
          {stats.topHotels.map(hotel => (
            <li key={hotel._id} className="bg-white p-4 shadow rounded-md flex justify-between">
              <span>{hotel.name}</span>
              <span className="font-semibold">{hotel.rating} ⭐</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
