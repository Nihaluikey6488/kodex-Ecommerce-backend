/**
 * This is file is setting the application of Express server
 */
import express from 'express' 
import authRoutes from '../src/routes/auth.routes.js'
// Initialize Express Application
let app=express()
app.use(express.json())

app.use('/api/auth',authRoutes)


// Global error handling middleware to catch any errors that occur in the application and send a response with status code 500 and a message
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).json({message:"Something went wrong"})
})

// Export Configured app so we can use it in  other file  
export default app;
