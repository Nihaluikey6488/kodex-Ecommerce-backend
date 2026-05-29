/**
 * This is file is setting the application of Express server
 */
import express from 'express' 
import cookieParser from 'cookie-parser'
import authRoutes from '../src/routes/auth.routes.js'
// Initialize Express Application
let app=express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)


// Global error handling middleware to catch any errors that occur in the application and send a response with status code 500 and a message
app.use((err,req,res,next)=>{
    
    let statuscode=err.statusCode || 500
    let message=err.message || "Something went wrong"
    console.error(err.stack)    
    res.status(statuscode).json({message:message})
})

// Export Configured app so we can use it in  other file  
export default app;
