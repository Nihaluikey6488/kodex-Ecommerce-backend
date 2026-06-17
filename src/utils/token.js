import jwt from 'jsonwebtoken'  // Importing the jsonwebtoken library to generate and verify JWT tokens
import env from '../config/env.js'

// Function to generate a JWT token for a given user ID, using the secret key from environment variables and setting an expiration time of 1 hour
const tokenGenerate=(user)=>{
    return jwt.sign({id:user._id || user.id, email:user.email},env.jwtSecret,{
        expiresIn:env.jwtExpiresIn
    })
}

export default tokenGenerate
