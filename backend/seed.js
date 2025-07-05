const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const db = new sqlite3.Database(process.env.DB_PATH);

db.serialize(() => {
  //   db.run(`
  //       CREATE TABLE IF NOT EXISTS orders (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         product TEXT NOT NULL,
  //         qty INTEGER NOT NULL,
  //         price REAL NOT NULL
  //       )
  //     `);

  const mockOrders = [
    { product: "Kwek-kwek", qty: 10, price: 5 },
    { product: "Fishball", qty: 30, price: 0.5 },
    { product: "Kikiam", qty: 20, price: 1.5 },
    { product: "Softdrinks", qty: 10, price: 25.5 },
    { product: "Ice Scramble", qty: 5, price: 20.0 },
  ];

  const stmt = db.prepare(
    "INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)"
  );

  mockOrders.forEach((order) => {
    stmt.run(order.product, order.qty, order.price);
  });

  stmt.finalize();
});

db.close();
