import userModel from "../models/users.model.js";

export const findUserByEmail = (email, options = {}) => {
  const query = userModel.findOne({ email });

  if (options.includePassword) {
    query.select("+password");
  }

  return query;
};

export const createUser = (userData) => {
  return userModel.create(userData);
};
