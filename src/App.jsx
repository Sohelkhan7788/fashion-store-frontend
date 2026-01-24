import './App.css'
import { Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Public Pages
import Home from './pages/Home'
import Blog from './pages/Blog'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout";
import OrderSuccess from './pages/OrderSuccess'
import MyOrders from './pages/MyOrders'

// Admin Protection
import AdminProtected from "./admin/AdminProtected";

// Admin Pages
import AdminProducts from "./admin/pages/AdminProducts";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from './admin/pages/EditProduct'
import AdminOrders from './admin/pages/AdminOrders'

import Dashboard from "./admin/pages/Dashboard";



function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* -------- PUBLIC ROUTES -------- */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        


        {/* -------- ADMIN ROUTES (PROTECTED) -------- */}
        <Route element={<AdminProtected />}>
          
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Routes>

      <Footer />
    </>
  )
}

export default App
