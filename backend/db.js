import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function createDB() {
  const db = await open({
    filename: "./cart.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY,
      title TEXT,
      price REAL,
      qty INTEGER
    );
  `);

  return db;
}
