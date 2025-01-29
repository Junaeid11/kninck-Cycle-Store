

import { Order } from "./order.interface";
import  { model, Schema } from "mongoose";


const orderSchema = new Schema<Order>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    totalPrice: {
        type: Number,
        required: true,
        min: [0, "Value cannot be negative"]
    },
    status: {
        type: String,
        enum: ["Pending", "paid", ],
        default: "Pending",
      },
    orderStatus: {
        type: String,
        enum: ["Pending", "Accepted", ],
        default: "Pending",
      },

      transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
      },

}, { timestamps: true })


//using pre hook 
// orderSchema.pre('save', async function (next) {
//     const order = this as Order;
//     const productDetails = await ProductModel.findById(order.products.quantity);
//     if(!productDetails){
//         throw new Error("Product not found")
//     }
//     else if(productDetails.quantity < order.products.quantity){
//         throw new Error("Out of stock")
//     }
//     else{
//         productDetails.quantity -= order.products.quantity;
//         productDetails.inStock = productDetails.quantity > 0;
//         await productDetails.save();
//         next()
//     }
// })

//for removing __v
orderSchema.set('toJSON', {
    transform:(doc ,value)=>{
      delete value.__v;
      return value;
    }
  })


const OrderModel = model<Order>('Order', orderSchema);
export default OrderModel

