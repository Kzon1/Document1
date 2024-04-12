import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: {
    type: mongoose.ObjectId,
    ref: "Products",
  },
  name: String,
  price: Number,
  quantity: Number,
  // Add more fields as needed
});

const orderSchema = new mongoose.Schema(
  {
    products: [productSchema],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
