import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-around",
          background: "#2563eb",
          padding: "12px",
          color: "white",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          🏠 Products
        </Link>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          🛒 View Cart
        </Link>
        <Link to="/checkout" style={{ color: "white", textDecoration: "none" }}>
          💳 Checkout
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
