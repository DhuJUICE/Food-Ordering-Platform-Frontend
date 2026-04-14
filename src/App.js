import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import { CartProvider } from "./components/pageComponents/CartPage/cart-context";
import { ProductProvider } from "./components/pageComponents/MenuPage/product-context";
import { AuthProvider } from './components/userManagementComponents/auth-context';
import { ShopProvider } from "./components/pageComponents/LandingPage/ShopContext";

import Header from './components/sectionComponents/header';
import Footer from './components/sectionComponents/footer';
import ScrollToTop from "./components/scrollComponents/scrollToTop";

import SignIn from "./components/userManagementComponents/sign-in";
import SignUp from "./components/userManagementComponents/sign-up";

import Dashboard from "./components/pageComponents/ManagementPages/BusinessDashboardPage";
import ManageMenu from "./components/pageComponents/ManagementPages/MenuManagementPage";

import Menu from "./components/pageComponents/MenuPage/menu";
import Cart from "./components/pageComponents/CartPage/cart";
import Checkout from "./components/pageComponents/CheckoutPage/checkout";
import PaymentSuccessPage from "./components/pageComponents/CheckoutPage/PaymentSuccess";
import PaymentFailurePage from "./components/pageComponents/CheckoutPage/PaymentFailure";
import TrackOrders from "./components/pageComponents/TrackOrderPage/TrackOrderPage";

import LandingPage from "./components/pageComponents/LandingPage/LandingPage";

// 👇 NEW layout component
const Layout = () => {
  const location = useLocation();

  // hide header on landing page
  const hideHeader = location.pathname === "/";

  return (
    <div className="App">
      {!hideHeader && (
        <div className="header">
          <Header />
        </div>
      )}

      <div className="body">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/menu" element={
            <ProductProvider>
              <Menu />
            </ProductProvider>
          } />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<PaymentSuccessPage />} />
          <Route path="/failure" element={<PaymentFailurePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/track-orders" element={<TrackOrders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage-menu" element={<ManageMenu />} />
        </Routes>
      </div>

      <div className="footer">
        <Footer />
      </div>

      <ScrollToTop />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ShopProvider>
        <CartProvider>
          <Router>
            <Layout /> {/* 👈 use layout */}
          </Router>
        </CartProvider>
      </ShopProvider>
    </AuthProvider>
  );
}

export default App;