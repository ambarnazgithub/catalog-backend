
// server.js
import express from "express";
import cors from "cors";
import { router as skincareRouter } from "./routes/skincareRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
app.use(cors({
  origin: process.env.FRONT_END_URL || "http://localhost:5176"
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the Skincare API",
    status: "working"
  });
});

// Use skincare routes
app.use(skincareRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});