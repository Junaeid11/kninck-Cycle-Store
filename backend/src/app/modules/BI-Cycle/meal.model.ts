import { Schema, model } from "mongoose";
import { BiCycle } from "./cycle.interface";

const CycleSchema = new Schema<BiCycle>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },

    isActive: { type: Boolean, default: true },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },

    description: { type: String, required: true },
    imageUrls: { type: [String], required: true },

    quantity: { type: Number, required: true },
    stock: { type: Number, required: true },

    inStock: { type: Boolean, default: true },

    specs: {
      frame: { type: String },
      brakes: { type: String },
      battery: { type: String },
      range: { type: String },
      motor: { type: String },
      topSpeed: { type: String },
      weight: { type: String },
    },

    rating: { type: Number, default: 0 },

    reviews: [
      {
        user: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
        date: { type: String, required: true },
      },
    ],

    variants: {
      colors: { type: [String] },
      sizes: { type: [String] },
    },
  },
  {
    timestamps: true,
  }
);

  
CycleSchema.pre<BiCycle>('validate', function (next) {
   if (this.isModified('name') && !this.slug) {
      this.slug = this.name
         .toLowerCase()
         .replace(/ /g, '-')
         .replace(/[^\w-]+/g, '');
   }
   next();
});



export default model<BiCycle>("cycle", CycleSchema);

