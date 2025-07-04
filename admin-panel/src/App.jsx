import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import PendingHotels from './components/PendingHotels';
import AdminLayout from './components/AdminLayout';
import RequireAdmin from './components/RequireAdmin';
import HotelList from './components/HotelList';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/pending-hotels" element={<PendingHotels />} />
            <Route path="/hotels" element={<HotelList />} />
          </Route>
        </Route>
      </Routes>

    </Router>
  );
}
