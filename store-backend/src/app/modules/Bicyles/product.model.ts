import mongoose, {  Schema } from "mongoose";
import { BiCycle } from "./product.interface";


const productSchema = new Schema<BiCycle>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minLength: [3, "At least 3 characters long"],
      maxLength: [50, "Cannot exceed 50 characters"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      minLength: [2, "At least 2 characters long"],
      maxLength: [30, "Brand cannot exceed 30 characters"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["Mountain", "Road", "Hybrid", "Bmx", "Electric"],
        message: "{VALUE} is not a valid type. Allowed types are Mountain, Road, Hybrid, Bmx, Electric.",
      },
    },
    image: {
      type: [String],
      required: [true, "Image is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [10, "At least 10 characters long"],
      maxLength: [500, "Cannot exceed 500 characters"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be an integer",
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//for removing __v
productSchema.set('toJSON', {
  transform:(doc ,value)=>{
    delete value.__v;
    return value;
  }
})

const ProductModel = mongoose.model<BiCycle>('Product', productSchema);
export default ProductModel;