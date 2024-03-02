import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from '../pages/Login'
import Sidebar from '../components/Sidebar'
import Home from '../pages/Home'
import { AddCategory } from '../container/category/AddCategory'
import { AddProduct } from '../container/product/AddProduct'
import Category from '../container/category'
import Navbar from '../components/Navbar'
import ProtectedRoute from './ProtectedRoute'
import ForgotPassword from '../pages/ForgotPassword'
import Product from '../container/product'

interface props {

}
const Routing: React.FC<props> = () => {
    const location = useLocation();
    const hasHeader = location.pathname === '/login' || location.pathname === '/forgot-password';
    return (<>
        <>
            {!hasHeader && <Navbar />}
            <div className='flex m-auto justify-center align-middle' >
                {!hasHeader && <Sidebar />}
                <Routes>
                    <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path='/category' element={<ProtectedRoute><Category /></ProtectedRoute>} />
                    <Route path='/category/add-edit' element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
                    <Route path='/product' element={<ProtectedRoute><Product /></ProtectedRoute>} />
                    <Route path='/product/add-edit' element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='*' element={<>No Page Found</>} />
                </Routes>
            </div>
        </>
    </>
    )
}

export default Routing