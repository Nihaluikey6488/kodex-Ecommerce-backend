import { body, param, query } from "express-validator";

export const productIdValidation = [
  param("id").isMongoId().withMessage("Invalid product ID"),
];

export const productQueryValidation = [
  query("category")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Category should be at least 2 characters long"),
];

export const createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name should be at least 3 characters long"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("category")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Category should be at least 2 characters long"),
];

export const updateProductValidation = [
  ...productIdValidation,
  ...createProductValidation,
];
