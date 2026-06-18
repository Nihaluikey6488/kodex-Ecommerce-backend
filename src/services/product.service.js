import { uploadFile } from "../config/imageKit.js";
import {
  createProduct,
  deleteProductByIdAndOwner,
  findProductByIdAndOwner,
  findProductsByOwner,
  updateProductByIdAndOwner,
} from "../repositories/product.repository.js";
import ApiError from "../utils/apiError.js";

const uploadImages = async (files = []) => {
  const uploadedFiles = await Promise.all(
    files.map((file) => uploadFile(file.buffer, file.originalname)),
  );

  return uploadedFiles.map((file) => file.url);
};

const buildProductPayload = (body) => {
  return {
    name: body.name.trim(),
    description: body.description?.trim() || "",
    price: Number(body.price),
    category: body.category?.trim() || "general",
  };
};

export const createProductService = async ({ body, files = [], user }) => {
  const imageUrls = await uploadImages(files);
  const productPayload = buildProductPayload(body);

  return createProduct({
    ...productPayload,
    images: imageUrls,
    user: user.id,
  });
};

export const getProductService = async ({ query, user }) => {
  return findProductsByOwner({
    userId: user.id,
    category: query.category,
  });
};

export const getProductByIdService = async ({ id, user }) => {
  const product = await findProductByIdAndOwner(id, user.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

export const deleteProductService = async ({ id, user }) => {
  const product = await deleteProductByIdAndOwner(id, user.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

export const updateProductService = async ({ id, body, files = [], user }) => {
  const updateData = buildProductPayload(body);

  if (files.length > 0) {
    updateData.images = await uploadImages(files);
  }

  const product = await updateProductByIdAndOwner(id, user.id, updateData);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};
