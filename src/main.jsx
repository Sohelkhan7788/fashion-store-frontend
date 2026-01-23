import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react";

import { CartProvider } from "./context/CartContext.jsx";



createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    
    <BrowserRouter>
      <CartProvider>
        <App />
        </CartProvider>
      </BrowserRouter>
      
  </ClerkProvider>
  
)
