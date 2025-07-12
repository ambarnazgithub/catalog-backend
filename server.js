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
  origin: process.env.FRONT_END_URL || "http://localhost:5176",
  credentials: true
}));

app.use(express.json());

// Use skincare routes BEFORE the root route
app.use(skincareRouter);

// Root route - put this AFTER the API routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the Skincare API",
    status: "working",
    endpoints: {
      test: "/api/test",
      products: "/api/skincare-products"
    }
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method
  });
});

// For Vercel, we need to export the app as well
export default app;

// Only start the server if we're not in Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
}