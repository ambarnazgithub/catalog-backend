// product-catalog/backend/routes/skincareRoute.js
import express from "express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const router = express.Router();

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load products
let products = [];
try {
  const filePath = join(__dirname, "../products.json");
  products = JSON.parse(readFileSync(filePath, "utf-8"));
  console.log("✅ Products loaded successfully");
} catch (error) {
  console.error("❌ Error loading products:", error);
  
  products = [];
}

// Test route - simple path
router.get("/api/test", (req, res) => {
  console.log("✅ Test endpoint accessed");
  res.json({ 
    message: "API is working!",
    timestamp: new Date().toISOString()
  });
});

// Products route - simple path
router.get("/api/skincare-products", (req, res) => {
  console.log("✅ Products endpoint accessed");
  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

export { router };
