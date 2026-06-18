import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductService,
  updateProductService,
} from "../services/product.service.js";

/**
 * @route POST /api/products
 * @description Create a new product in the database
 * @access Private
 */
export const addProductController = asyncHandler(async (req, res) => {
  const product = await createProductService({
    body: req.body,
    files: req.files,
    user: req.user,
  });

  return res
    .status(201)
    .json(new ApiResponse("Product created successfully", product));
});
/**
 * @route GET /api/products
 * @description get all products saved in the database
 * @access Private
 */
export const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await getProductService({
    query: req.query,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse("Products fetched successfully", products));
});
/**
 * @route GET /api/products/:id
 * @description get single product by id
 * @access Private
 */

export const getProductByIdController = asyncHandler(async (req, res) => {
  const product = await getProductByIdService({
    id: req.params.id,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse("Product fetched successfully", product));
});

/**
 * @route DELETE /api/products/:id
 * @description Delete  single product by id
 * @access Private
 */

export const deleteProductController = asyncHandler(async (req, res) => {
  await deleteProductService({
    id: req.params.id,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse("Product deleted successfully", null));
});

/**
 * @route PUT /api/products/:id
 * @description update  single product by id
 * @access Private
 */

export const updateProductController = asyncHandler(async (req, res) => {
  const product = await updateProductService({
    id: req.params.id,
    body: req.body,
    files: req.files,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse("Product updated successfully", product));
});
