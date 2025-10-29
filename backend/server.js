import express from "express";
import cors from "cors";
import axios from "axios";
import { createDB } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

let db;
createDB().then((database) => (db = database));

// 📦 GET /api/products — from Fake Store API
app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products?limit=8");
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// 🛒 POST /api/cart — Add item to cart
app.post("/api/cart", async (req, res) => {
  const { productId, qty } = req.body;

  try {
    // Get the product details from Fake Store API
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
    const product = response.data;

    // Insert or update in SQLite
    await db.run(
      `INSERT INTO cart (id, title, price, qty) VALUES (?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET qty = qty + ?`,
      [product.id, product.title, product.price, qty, qty]
    );

    res.json({ message: `${product.title} added to cart` });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// 🛒 GET /api/cart — Fetch all cart items
app.get("/api/cart", async (req, res) => {
  try {
    const items = await db.all("SELECT * FROM cart");
    const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
    res.json({ items, total });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// 🗑️ DELETE /api/cart/:id — Remove item
app.delete("/api/cart/:id", async (req, res) => {
  await db.run("DELETE FROM cart WHERE id = ?", [req.params.id]);
  res.json({ message: "Removed from cart" });
});

// 💳 POST /api/checkout — Mock checkout
app.post("/api/checkout", async (req, res) => {
  const timestamp = new Date().toISOString();
  const items = await db.all("SELECT * FROM cart");
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  await db.exec("DELETE FROM cart"); // Clear cart
  res.json({ message: "Checkout complete", total, timestamp });
});

app.listen(4000, () => console.log("✅ Backend running on http://localhost:4000"));
