import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSlider from './components/HeroSlider'
import BlogHero from './components/BlogHero'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from "./pages/Login";
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout";
import Footer from './components/Footer'
import OrderSuccess from './pages/OrderSuccess'
import MyOrders from './pages/MyOrders'




import AdminProducts from "./admin/pages/AdminProducts";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from './admin/pages/EditProduct'
import AdminProtected from './admin/AdminProtected'
import AdminOrders from './admin/pages/AdminOrders'

function App() {


  return (
    

    <>
      
      <Navbar />
      <br />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/my-orders" element={<MyOrders />} />

         <Route path="/admin/products" element={<AdminProtected><AdminProducts /></AdminProtected>} />
        <Route path="/admin/add-product" element={
          <AdminProtected><AddProduct /></AdminProtected>} />
        
        <Route path="/admin/edit-product/:id" element={
          <AdminProtected><EditProduct /></AdminProtected>
         } />
        
         <Route
  path="/admin/orders"
  element={
    <AdminProtected>
      <AdminOrders />
    </AdminProtected>
  }
/>

      </Routes>
      <Footer />
    </>
  )
}

export default App
