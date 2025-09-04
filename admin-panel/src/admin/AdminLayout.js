import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div>
      <header className="admin-header">
        <h1>🛡 Admin Panel</h1>
        <nav className="admin-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/users">İstifadəçilər</Link>
          <Link to="/pending-hotels">Pending Otellər</Link>
          <Link to="/hotels">Otellər</Link>
          <li><Link to="/admin/contact-messages">Əlaqə Mesajları</Link></li>
          <button
            className="admin-logout-button"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = "/";
            }}
          >
            Çıxış
          </button>
        </nav>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
