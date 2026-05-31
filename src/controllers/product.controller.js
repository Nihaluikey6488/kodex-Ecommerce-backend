import sendFiles from "../config/imageKit.js";
import productModel from "../models/products.model.js";
import { createProductService, deleteProductService, getProductByIdService, getProductService, updateProductService } from "../services/product.service.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

/**
 * @route POST /api/products
 * @description Create a new product in the database
 * @access Public
 */
export const addProductController = asyncHandler(async (req, res) => {
 
  // Pass product data, uploaded files, and authenticated user's email to the service layer
 let product=await createProductService({
  body:req.body,
  files:req.files,
  email:req.user.email
 })
  // Send success response
  return res
    .status(201)
    .json(new ApiResponse("Product created successfully", product));
});
/**
 * @route GET /api/products
 * @description get all products saved in the database
 * @access Public
 */
export const getAllProductsController = asyncHandler(async (req, res) => {
  // Fetch  products from getProductService to get all products saved in database
let products=await getProductService({
  query:req.query,
  user:req.user
})

  // Return a success response with the fetched products data using the ApiResponse class to standardize the response format
  return res
    .status(200)
    .json(new ApiResponse("Products fetched successfully", products));
});
/**
 * @route GET /api/products/:id
 * @description get single product by id
 * @access Public
 */

export const getProductByIdController = asyncHandler(async (req, res) => {
 let product=await getProductByIdService(req.params)
  // Success Response
  return res
    .status(200)
    .json(new ApiResponse("Products fetched successfully", product));
});

/**
 * @route DELETE /api/products/:id
 * @description Delete  single product by id
 * @access Public
 */

export const deleteProductController = asyncHandler(async (req, res) => {
 await deleteProductService(req.params)
  // Success Response
  return res
    .status(200)
    .json(new ApiResponse("Product deleted successfully", null));
});

/**
 * @route PUT /api/products/:id
 * @description update  single product by id
 * @access Public
 */

export const updateProductController = asyncHandler(async (req, res) => {
  // Get uploaded files

  const product=await updateProductService({
  id:req.params.id,
  data:req.body,
  files:req.files
  })

  // Success Response
  return res.status(200).json(new ApiResponse("Product updated successfully",product));
});
