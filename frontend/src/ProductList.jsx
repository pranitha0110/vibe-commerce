import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🛒 Product List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ height: "150px", objectFit: "contain" }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{p.title}</h3>
            <p style={{ fontWeight: "bold" }}>₹{p.price}</p>

            {/* 👇 Replace old button with this one */}
            <button
              onClick={() => {
                fetch("http://localhost:4000/api/cart", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ productId: p.id, qty: 1 }),
                }).then(() => alert(`${p.title} added to cart!`));
              }}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "8px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
