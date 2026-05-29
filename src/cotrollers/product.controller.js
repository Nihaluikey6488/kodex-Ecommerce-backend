import sendFiles from "../config/imageKit.js";
import productModel from "../models/products.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from 'mongoose'

/**
 * @route POST /api/products
 * @description Create a new product in the database
 * @access Public
 */
export const addProductController = asyncHandler(async (req, res) => {
  // Get uploaded files
  let files = req.files;

  // Extract product data
  let { name, description, price, category } = req.body;

  // Validate product name
  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  // Validate minimum name length
  if (name.length < 3) {
    throw new ApiError(401, "Name must be at least more than 3 characters");
  }

  // Validate price
  if (!price) {
    throw new ApiError(400, "Price is required");
  }

  // Upload all images to ImageKit
  let uploadFiles = await Promise.all(
    files.map(async (elem) => {
      return await sendFiles(elem.buffer, elem.originalname);
    }),
  );

  // Extract only image URLs
  let onlyUrls = uploadFiles.map((elem) => elem.url);

  // Create product in database
  let product = await productModel.create({
    name,
    description,
    price,
    category,
    images: onlyUrls,
    user: req.user.email,
  });

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
export const getAllProductsController=asyncHandler(async(req,res)=>{
    // Fetch all products from the database using the product model and return a success response with the fetched products data
    let products=await productModel.find()
    // check if no products are  added
    if(products.length==0){
        throw new ApiError(400,"No products added")
    }
    // Return a success response with the fetched products data using the ApiResponse class to standardize the response format
    return res.status(200).json(new ApiResponse("Products fetched successfully",products))

})
/**
 * @route GET /api/products/:id
 * @description get single product by id 
 * @access Public
 */

 export const getProductByIdController=asyncHandler(async(req,res)=>{

    let {id}=req.params
    // ---- Check if id is valid mongoose ObjectId ----
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note ID" });
    }
    //Find the  product by id in database
let product=await productModel.findById(id)
// Check if the product does not exist
if(!product){
    throw new ApiError(404,'Product not found')
}
// Success Response
 return res.status(200).json(new ApiResponse("Products fetched successfully",product))


 })

 /**
 * @route DELETE /api/products/:id
 * @description Delete  single product by id 
 * @access Public
 */

 export const deleteProductController=asyncHandler(async(req,res)=>{
    let {id}=req.params
    // ---- Check if id is valid mongoose ObjectId ----
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note ID" });
    }
    //Find the  product by id in database
let product=await productModel.findById(id)
// Check if the product does not exist
if(!product){
    throw new ApiError(404,"Product not found")
}
// delete single product form database, configured by Id
await productModel.findByIdAndDelete(id)
// Success Response
return res.status(200).json(new ApiResponse("Product deleted successfully",null))

 })