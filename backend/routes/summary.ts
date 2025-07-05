import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";
import { summarizeOrders, Order } from "../summary"; // adjust path if needed
import dotenv from "dotenv";


dotenv.config();

const router = express.Router();
const db = new sqlite3.Database(process.env.DB_PATH || "./data.db");

router.get("/", (req: Request, res: Response) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            console.error("Error fetching orders:", err);
            return res.status(500).json({ error: "Database error" });
        }

        try {
            const summary = summarizeOrders(rows as Order[]);
            console.log(summary)
            res.json(summary);
        } catch (e) {
            res.status(500).json({ error: "Error summarizing orders" });
        }
    });
});

export default router;