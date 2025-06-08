import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from '../layout/Layout'
import Home from '../pages/home/Home'
// import Basket from '../pages/basket/Basket'
// import Admin from '../pages/admin/Admin'

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />} />
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
