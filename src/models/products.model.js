// Import mongoose package
import mongoose from "mongoose"


// Create schema for products collection
const productSchema = new mongoose.Schema({

    // Product name field
    name: {
        type: String, // Data type will be string
        trim: true, // Remove extra spaces from start and end
        required: [true, "Product name is required"] // Validation message
    },

    // Product description field
    description: {
        type: String // Product description stored as string
    },

    // Product price field
    price: {
        type: Number, // Data type number
        required: [true, "Product Price is required"] // Price is mandatory
    },

    // Product category field
    category: {
        type: String, // Category stored as string
        trim: true // Remove extra spaces
    },

    // Array to store multiple product image URLs
    images: [
        {
            type: String // Each image stored as URL string
        }
    ],
user:String

}, {

    // Automatically add createdAt and updatedAt fields
    timestamps: true
})


// Create model from product schema
const productModel = mongoose.model("product", productSchema)


// Export product model
export default productModel