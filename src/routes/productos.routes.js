import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/product/:id", getProduct);

router.post("/create", createProducts);

router.patch("/create/:id", updateProducts);

router.delete("/product/:id", deleteProducts);

export default router;
