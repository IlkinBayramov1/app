import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import AddHotel from '../pages/addHotel/AddHotel';
import MyHotels from '../pages/myHotels/MyHotels';
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
