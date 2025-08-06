// App.jsx
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// 🔁 변경된 부분 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
import { HashRouter as Router, Routes, Route } from "react-router-dom";
// 🔁 원래는 BrowserRouter였음

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import MyOrders from "./pages/MyOrders";
import MyCoupons from "./pages/MyCoupons";
import { CartProvider } from "./pages/CartContext";
import { AuthProvider, useAuth } from "./pages/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";
import NavBar from "./pages/NavBar";
import "./axiosConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const { loading } = useAuth();

  if (loading) return <div className="p-4">로딩 중...</div>;

  return (
    <CartProvider>
      <Router> {/* 🔁 HashRouter 적용됨 */}
        <div className="p-4">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route
              path="/mypage/orders"
              element={
                <PrivateRoute>
                  <MyOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypage/coupons"
              element={
                <PrivateRoute>
                  <MyCoupons />
                </PrivateRoute>
              }
            />
          </Routes>
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default function App() {
  useEffect(() => {
    if (!localStorage.getItem("guestId")) {
      localStorage.setItem("guestId", uuidv4());
    }
  }, []);

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
