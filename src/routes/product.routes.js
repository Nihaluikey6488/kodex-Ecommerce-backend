// This file defines the routes for porduct Management
import  express from 'express'
import upload from '../middlewares/multer.middleware.js'
import sendFiles from '../config/imageKit.js'
import productModel from '../models/products.model.js'
import ApiError from '../utils/apiError.js'
import { addProductController } from '../cotrollers/product.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'

// router setup for user authentication routes
let router=express.Router()
// POST API route for creating new products
// URL: /products
// When a POST request comes to /products,
// addProductController function will run
router.post('/products',upload.array('images',5),authMiddleware,addProductController)
// GET API route for fetching all products
// URL: /products
// When a GET request comes to /products,
// addProductController function will run
// Export  configured  router so it can be used in other files

export default router
