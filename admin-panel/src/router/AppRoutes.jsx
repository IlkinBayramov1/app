import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../components/Login';
import Dashboard from '../admin/Dashboard';
import UserList from '../admin/UserList';
import PendingHotels from '../admin/PendingHotels';
import AdminLayout from '../admin/AdminLayout';
import RequireAdmin from '../components/RequireAdmin';
import HotelList from '../admin/HotelList';
import ContactMessages from '../admin/ContactMessages';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<RequireAdmin />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/pending-hotels" element={<PendingHotels />} />
          <Route path="/hotels" element={<HotelList />} />
          <Route path='/contact-messages' element={<ContactMessages />} />
        </Route>
      </Route>
    </Routes>
  );
}
