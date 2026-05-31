import mongoose from "mongoose";
import sendFiles from "../config/imageKit.js";
import productModel from "../models/products.model.js";
import ApiError from "../utils/apiError.js";

export const createProductService=async({body,files,email})=>{
     
    
      // Extract product data
      let { name, description, price, category } = body;
    
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
        user: email,
      });
    // Return  product so it can used in controller to get created products
    return product
}

export const getProductService=async({query,user})=>{
     // Get category from query params
   let {category}=query 
      let products;
    
    
 
      if (category) {
        products = await productModel.find({
          category: category,
        });
      } else {
        // Return all products
        products = await productModel.find({
          id:user._id,
          user:user.email
        });
      }
      // check if no products are  added
      if (products.length == 0) {
        throw new ApiError(400, "No products added");
      }
      return products
}

export const getProductByIdService=async(params)=>{
 let {id}=params
  // ---- Check if id is valid mongoose ObjectId ----
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid note ID" });
  }
  //Find the  product by id in database
  let product = await productModel.findById(id);
  // Check if the product does not exist
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return product
}

export const deleteProductService=async(params)=>{
     let { id } = params
      // ---- Check if id is valid mongoose ObjectId ----
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note ID" });
      }
      //Find the  product by id in database
      let product = await productModel.findById(id);
      // Check if the product does not exist
      if (!product) {
        throw new ApiError(404, "Product not found");
      }
      // delete single product form database, configured by Id
      await productModel.findByIdAndDelete(id);
}

export const updateProductService=async({id,data,files})=>{
   
  // Extract product data
  let { name, description, price, category } = data;

  // ---- Check if id is valid mongoose ObjectId ----
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid note ID" });
  }

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

  // Upload all updated images to ImageKit
  let uploadFiles = await Promise.all(
    files.map(async (elem) => {
      return await sendFiles(elem.buffer, elem.originalname);
    }),
  );

  // Extract only image URLs
  let onlyUrls = uploadFiles.map((elem) => elem.url);

  // find product in database by id
  let product = await productModel.findById(id);
  // Check if produc not found
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Update product details
  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  product.images = onlyUrls;
  // save the updated product
  await product.save();
  return product
}