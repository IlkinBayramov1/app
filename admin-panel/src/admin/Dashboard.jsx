import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css'; // burda əlavə et

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

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
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Admin Panel – Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>👥 İstifadəçilər</h2>
          <p className="stat-number">{stats.totals.users}</p>
        </div>

        <div className="stat-card">
          <h2>🏨 Otellər</h2>
          <p className="stat-number hotels">{stats.totals.hotels}</p>
        </div>

        <div className="stat-card">
          <h2>🛏️ Rezervasiyalar</h2>
          <p className="stat-number reservations">{stats.totals.reservations}</p>
        </div>
      </div>

      <section className="top-hotels-container">
        <h2 className="top-hotels-title">⭐ Ən yüksək reytinqli otellər</h2>
        <ul className="top-hotels-list">
          {stats.topHotels.map(hotel => (
            <li key={hotel._id} title={`Reytinq: ${hotel.rating} ⭐`}>
              <span>{hotel.name}</span>
              <span>{hotel.rating} ⭐</span>
            </li>
          ))}
        </ul>
      </section>

      {stats.dailyStats && (
        <section className="daily-stats-container">
          <h2 className="daily-stats-title">📈 Gündəlik Statistikalar</h2>
          <Line
            data={{
              labels: stats.dailyStats.labels,
              datasets: [
                {
                  label: 'İstifadəçilər',
                  data: stats.dailyStats.userCounts,
                  fill: false,
                  borderColor: 'rgb(59, 130, 246)', // blue
                  tension: 0.3,
                  pointRadius: 5,
                  pointHoverRadius: 7,
                },
                {
                  label: 'Rezervasiyalar',
                  data: stats.dailyStats.reservationCounts,
                  fill: false,
                  borderColor: 'rgb(34, 197, 94)', // green
                  tension: 0.3,
                  pointRadius: 5,
                  pointHoverRadius: 7,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                    color: '#4B5563', // gray-600
                    font: { weight: '600' },
                  },
                  grid: {
                    color: '#E5E7EB', // gray-200
                  },
                },
                x: {
                  ticks: {
                    color: '#6B7280', // gray-500
                    font: { weight: '600' },
                  },
                  grid: {
                    color: '#F3F4F6', // gray-100
                  },
                },
              },
            }}
          />
        </section>
      )}
    </div>
  );
};

export default Dashboard;
