// This file defines the routes for porduct Management
import  express from 'express'
import upload from '../middlewares/multer.middleware.js'
import sendFiles from '../config/imageKit.js'
import productModel from '../models/products.model.js'

// router setup for user authentication routes
let router=express.Router()

router.post('/products',upload.array('images',5),async(req,res)=>{
try {
    let files= req.files
let {name,description,price,category}=req.body
let uploadedFiles=await Promise.all(files.map(async(elem)=>{
    return await sendFiles(elem.buffer,elem.originalname)
}))

let onlyUrls=uploadedFiles.map((elem)=>elem.url)
let product =await productModel.create({
    name,
    description,
    price,
    category,
    images:onlyUrls
})
console.log("product",product)
return res.send("product created")
} catch (error) {
    console.log("Error in product controller",error)
    return res.status(500).json({
        message:"Error in produt"
    })
}

})

// Export  configured  router so it can be used in other files 
export default router
