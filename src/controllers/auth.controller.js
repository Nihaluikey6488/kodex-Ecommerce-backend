import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import tokenGenerate from "../utils/token.js";
import { cookieOptions } from "../config/cookie.js";
import {
  loginService,
  registerService,
} from "../services/auth.service.js";

/**
 * @route POST /api/auth/register
 * @description Create a new user and register in database
 * @access Public
 */
export const registerController = asyncHandler(async (req, res) => {
  const { user } = await registerService(req.body);
  const token = tokenGenerate(user);

  res.cookie("token", token, cookieOptions);

  // Send success response
  return res
    .status(201)
    .json(new ApiResponse("User registered successfully", user));
});

/**
 * @route POST /api/auth/login
 * @description user will login by providing credentials
 * @access Public
 */
export const loginController = asyncHandler(async (req, res) => {
  const { user } = await loginService(req.body);
  const token = tokenGenerate(user);

  res.cookie("token", token, cookieOptions);

  // Success Response
  return res
    .status(200)
    .json(new ApiResponse("User logged in successfully", user));
});
