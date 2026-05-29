import userModel from "../models/users.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import tokenGenerate from "../utils/token.js";
import comparePassword from '../models/users.model.js'
/**
 * @route POST /api/auth/register
 * @description Create a new user and register in database
 * @access Public
 */
export const registerController = asyncHandler(async (req, res) => {
  // Extract user data from user data
  let { name, email, password } = req.body;
  // --Validation --
  // check if any field is empty
  if (!name || !email || !password)
    throw new ApiError(400, "All fields are required");
  // check if the length of name field is less than 3 characters
  if (name.length < 3)
    throw new ApiError(409, "Name should be atleast 3 characters long");
  // Check the format of email
  let emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }
  // Check if the length of password field is less than 6 characters
  if (password.length < 6)
    throw new ApiError(409, "Password should be atleast 3 characters long");
  // Check if user already exists with same email
  let isExisted = await userModel.findOne({ email });

  // Throw error if email already registered
  if (isExisted) throw new ApiError(401, "Email already registered");
  // Create new user in database

  let newUser = await userModel.create({
    name,
    email,
    password,
  });
  //   // Generate authentication token
  let token = await tokenGenerate(newUser);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });
  // Send success response
  return res
    .status(201)
    .json(new ApiResponse("User registered successfully", newUser));
});
/**
 * @route POST /api/auth/login
 * @description user will login by providing credentials
 * @access Public
 */
export const loginController=asyncHandler(async(req,res)=>{
// Extract email and password from request body
    let {email,password}=req.body
      // Check if email or password is missing
    if(!email || !password){
        throw new ApiError(400,"All fields are required")
    }
    // Validate email format
    let emailRegex=/^\S+@\S+\.\S+$/;
    if(!emailRegex.test(email)){
        throw new ApiError(400,"Invalid email format")
    }
  
   // If a user with the same email already exists, throw an error
    let user=await userModel.findOne({email})
   // If user does not exist
    if(!user) {
        throw new ApiError(404,"User not found")
    }

    // Compare entered password with hashed password

    let comparePass=await user.ComparePassword(password)
    // If password does not match
    if(!comparePass) {
      throw new ApiError(401,"Invalid Credentials")
    }
    // generate the token
    let token=await tokenGenerate(user)
     res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });
    // Success Response
    return res.status(200).json({
      message:"User logged in successfully"
    })
    

})