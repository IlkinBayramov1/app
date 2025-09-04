import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Layout from '../layout/Layout';

// Pages
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import UserRegister from '../pages/auth/UserRegister';
import OwnerRegister from '../pages/auth/OwnerRegister';
import AddHotel from '../pages/hotels/AddHotel';
import HotelDetails from '../pages/hotels/HotelDetails';
import FavoriteHotels from '../pages/favorites/FavoriteHotels';
import ContactOwner from '../pages/messages/ContactOwner';
import UserProfile from '../pages/profile/UserProfile';
import OwnerProfile from '../pages/profile/OwnerProfile';
import Contact from '../pages/contact/Contact';



export default function Router() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register/user" element={<UserRegister />} />
          <Route path="register/owner" element={<OwnerRegister />} />
          <Route path="add-hotel" element={<AddHotel />} />
          <Route path="hotels/:id" element={<HotelDetails />} />
          <Route path="favorites" element={<FavoriteHotels />} />
          <Route path="contact-owner/:hotelId" element={<ContactOwner />} />
          <Route path="/contact" element={<Contact />} />

          {/* Profil səhifəsi - rola görə yönləndirir */}
          <Route path="profile/edit" element={user?.role === 'owner' ? <OwnerProfile /> : <UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
