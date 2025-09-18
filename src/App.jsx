import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProducts";
import Register from "./components/user/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConformation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51S8IguDGc9acWm7z59EM13FLfDCzyQrxrWrtR1kgGep1V6E1HtWFfMRRdSVzhrXIdOSKtIboQP3D99eAqMtusWNE008yGOh7Ia"
  );

  return (
    <>
      <Router>
        <Elements stripe={stripePromise}>
          <Navbar />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<ShowProduct />} />
            <Route path="/product/search/:term" element={<SearchProduct />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Address />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/oderconfirmation" element={<OrderConfirmation />} />
          </Routes>
        </Elements>
      </Router>
    </>
  );
};

export default App;
