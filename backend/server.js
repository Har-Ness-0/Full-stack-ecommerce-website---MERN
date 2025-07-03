import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "../backend/config/db.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/authentication", authRoutes);
connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server Started");
  });
});
