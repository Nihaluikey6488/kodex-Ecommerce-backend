import mongoose from 'mongoose' // Importing mongoose Library for Mongodb connectino

// Function to connect database
async function connectDb(){
    
    try {
        // Connect MongoDB using connection string from .env file
        await mongoose.connect(process.env.MONGO_URI)
           // Print success message if database connected
        console.log("MongoDb connected successfully")
    } catch (error) {
        // Print error message if connection fails
        console.log("Error in MongoDb connection",error)
    }
}

export default connectDb;