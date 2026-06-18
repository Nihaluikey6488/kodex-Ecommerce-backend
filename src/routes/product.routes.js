import express from "express";
import {
  addProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createProductValidation,
  productIdValidation,
  productQueryValidation,
  updateProductValidation,
} from "../validations/product.validation.js";

const router = express.Router();

router
  .route("/products")
  .post(
    authMiddleware,
    upload.array("images", 5),
    createProductValidation,
    validate,
    addProductController,
  )
  .get(
    authMiddleware,
    productQueryValidation,
    validate,
    getAllProductsController,
  );

router
  .route("/products/:id")
  .get(authMiddleware, productIdValidation, validate, getProductByIdController)
  .delete(authMiddleware, productIdValidation, validate, deleteProductController)
  .put(
    authMiddleware,
    upload.array("images", 5),
    updateProductValidation,
    validate,
    updateProductController,
  );

export default router;
