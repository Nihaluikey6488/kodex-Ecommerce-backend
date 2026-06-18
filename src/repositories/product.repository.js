import productModel from "../models/products.model.js";

export const createProduct = (productData) => {
  return productModel.create(productData);
};

export const findProductsByOwner = ({ userId, category }) => {
  const filter = { user: userId };

  if (category) {
    filter.category = category;
  }

  return productModel.find(filter).sort({ createdAt: -1 });
};

export const findProductByIdAndOwner = (id, userId) => {
  return productModel.findOne({ _id: id, user: userId });
};

export const updateProductByIdAndOwner = (id, userId, updateData) => {
  return productModel.findOneAndUpdate(
    { _id: id, user: userId },
    updateData,
    { new: true, runValidators: true },
  );
};

export const deleteProductByIdAndOwner = (id, userId) => {
  return productModel.findOneAndDelete({ _id: id, user: userId });
};
