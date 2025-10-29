import React, { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart data from backend
  const fetchCart = () => {
    fetch("http://localhost:4000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        console.log("🧾 Cart data from backend:", data);

        // Handle both object and array formats
        const items = Array.isArray(data)
          ? data
          : data.items || [];

        setCart(items);

        // Calculate total price safely
        const totalPrice = items.reduce(
          (acc, item) =>
            acc +
            (item.price || item.cost || 0) *
              (item.qty || item.quantity || 1),
          0
        );
        setTotal(totalPrice);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = (id) => {
    fetch(`http://localhost:4000/api/cart/${id}`, { method: "DELETE" })
      .then(() => fetchCart());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#2563eb" }}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p style={{ marginTop: "20px" }}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={item.id || item.productId || index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <span style={{ flex: 1 }}>
                {item.title || item.name || `Product ${index + 1}`}
              </span>
              <span>Qty: {item.qty || item.quantity || 1}</span>
              <span>
                ₹
                {(item.price || item.cost || 0) *
                  (item.qty || item.quantity || 1)}
              </span>
              <button
                onClick={() =>
                  removeItem(item.id || item.productId || index)
                }
                style={{
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <h3 style={{ marginTop: "20px" }}>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
