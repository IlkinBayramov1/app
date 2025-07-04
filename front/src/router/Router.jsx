import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import AddHotel from '../pages/addHotel/AddHotel';
import MyHotels from '../pages/myHotels/MyHotels';
import HotelDetails from '../pages/HotelDetails';
import FavoriteHotels from '../pages/favorites/FavoriteHotels';
import UserProfile from '../pages/user/UserProfile';
import UserProfileEdit from '../pages/login/Login';

// import Basket from '../pages/basket/Basket'
// import Admin from '../pages/admin/Admin'

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/add-hotel" element={<AddHotel />} />
                        <Route path="/my-hotels" element={<MyHotels />} />
                        <Route path="/hotels/:id" element={<HotelDetails />} />
                        <Route path="/favorites" element={<FavoriteHotels />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/profile/edit" element={<UserProfileEdit />} />

                        {/* <Route path='/basket' element={<Basket />} /> */}
                        {/* <Route path='/admin' element={<Admin />} /> */}
                    </Route>
                    {/* <Route path='*' element={<Error />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router
