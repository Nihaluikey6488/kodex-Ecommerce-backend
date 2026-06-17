import userModel from "../models/users.model.js";
import ApiError from "../utils/apiError.js";

const sanitizeUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const registerService = async (data) => {
  const { name, email, password } = data;
  const normalizedEmail = email.toLowerCase();

  const existingUser = await userModel.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const newUser = await userModel.create({
    name: name.trim(),
    email: normalizedEmail,
    password,
  });

  return {
    user: sanitizeUser(newUser),
  };
};

export const loginService = async (data) => {
  const { email, password } = data;
  const normalizedEmail = email.toLowerCase();

  const user = await userModel.findOne({ email: normalizedEmail }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    user: sanitizeUser(user),
  };
};
