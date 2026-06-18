import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, "Product name should be at least 3 characters long"],
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      min: [0, "Product price cannot be negative"],
      required: [true, "Product price is required"],
    },
    category: {
      type: String,
      trim: true,
      default: "general",
    },
    images: {
      type: [String],
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
