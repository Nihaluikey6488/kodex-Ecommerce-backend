// This file defines the routes for user authentication-related API endpoints. It imports the Express router and the controller functions for user registration and login, and sets up POST routes for both operations.
import express from 'express'
import { registerController } from '../cotrollers/auth.controller.js'



// router setup for user authentication routes

let router =express.Router()
// POST API route for registering users
// URL: /register
// When a POST request comes to /register,
// registerController function will run

router.post('/register',registerController)

// Export confiured router so it can be used in other files
export default router