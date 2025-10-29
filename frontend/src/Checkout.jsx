import React, { useState } from "react";

function Checkout() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems: [], ...form }),
    })
      .then((res) => res.json())
      .then((data) => setReceipt(data));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>
      {!receipt ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ display: "block", margin: "10px 0", padding: "8px" }}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={{ display: "block", margin: "10px 0", padding: "8px" }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Submit Order
          </button>
        </form>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <h3>✅ Order Successful!</h3>
          <p>Name: {receipt.name}</p>
          <p>Email: {receipt.email}</p>
          <p>Total: ₹{receipt.total}</p>
          <p>Time: {receipt.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
