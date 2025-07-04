// src/components/AdminLayout.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex space-x-6">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/users" className="hover:underline">İstifadəçilər</Link>
        <Link to="/pending-hotels" className="hover:underline">Pending Otellər</Link>
      </header>

      <main className="p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
