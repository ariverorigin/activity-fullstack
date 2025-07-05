import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import summaryRoutes from "./routes/summary";
import orderRoutes from "./routes/orders";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Middleware
app.use(cors());

// Body parser
app.use(express.json());

// Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running!");
});

// Routes
app.use("/api/summary", summaryRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});