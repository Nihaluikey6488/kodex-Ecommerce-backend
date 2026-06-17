// Import mongoose for creating schema and model
import mongoose from "mongoose"

// Import bcrypt package for password hashing
import bcrypt from "bcrypt"

// Create schema for users collection
let userSchema = new mongoose.Schema({

    // Name field
    name: {
        type: String, // Data type will be string
        trim: true, // Remove extra spaces from start and end
        required: [true, "Name is required"] // Validation message if name missing
    },

    // Email field
    email: {
        type: String, // Data type string
        trim: true, // Remove unnecessary spaces
        lowercase: true,
        required: [true, "Email is required"], // Email is mandatory
        unique: true // Prevent duplicate emails
    },

    // Password field
    password: {
        type: String, // Password stored as string
        trim: true, // Remove extra spaces
        select: false,
        required: [true, "Password is required"] // Password is mandatory :
    }

}, {

    // Automatically add createdAt and updatedAt fields
    timestamps: true
})


// Middleware runs before saving user data  
userSchema.pre("save", async function () {

    // If password is not modified then skip hashing
    if (!this.isModified("password")) {
        return
    }

    // Hash password before storing in database
    this.password = await bcrypt.hash(this.password, 10)

   
   
})


// Custom method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (password) {

    // Compare normal password with encrypted password
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.ComparePassword = userSchema.methods.comparePassword


// Create model from schema
const userModel = mongoose.model("users", userSchema)


// Export model for use in other files
export default userModel
