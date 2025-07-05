import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
import { summarizeOrders, Order } from "../summary"; // adjust path if needed
import dotenv from "dotenv";



dotenv.config();

const router = express.Router();
const db = new sqlite3.Database(process.env.DB_PATH || "./data.db");

// GET api/orders: list of orders
router.get("/", (req: Request, res: Response) => {
    const { product, limit = 10, offset = 0 } = req.query;

    // Base query
    let query = "SELECT * FROM orders";
    const params: any[] = [];

    // Add product
    if (product) {
        query += " WHERE product LIKE ?";
        params.push(`%${product}%`);
    }

    // Add pagination
    query += " LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ error: "Database error" });
        }

        try {
            res.json(rows);
        } catch (e) {
            res.status(500).json({ error: "Error fetching orders" });
        }
    });
});


interface NewOrderRequestBody {
    product: string;
    qty: number;
    price: number;
}

// POST api/orders: create new order
router.post("/", (req: Request, res: Response) => {
    const { product, qty, price } = req.body;

    // Validate input
    if (
        typeof product !== "string" ||
        typeof qty !== "number" || qty <= 0 ||
        typeof price !== "number" || price < 0
    ) {
        return res.status(400).json({ error: "Invalid input. Must include the following: product (string), qty (positive number), price (non-negative number)." });
    }

    const insertQuery = "INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)";

    db.run(insertQuery, [product, qty, price], function (err) {
        if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        // `this.lastID` contains the new row's ID
        const newOrder = {
            id: this.lastID,
            product,
            qty,
            price,
        };

        return res.status(201).json(newOrder);
    });
});

export default router;