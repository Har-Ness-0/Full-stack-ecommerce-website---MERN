import express from "express";
import {
  addItem,
  deleteItem,
  UpdateItem,
} from "../controllers/cartControllers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, addItem);

router.put("/id", UpdateItem);
router.delete("/id", deleteItem);

export default router;
