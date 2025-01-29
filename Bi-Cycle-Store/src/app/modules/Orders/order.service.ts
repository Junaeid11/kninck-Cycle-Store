

import { APPerror } from "../../errors/AppError";
import ProductModel from "../Bicyles/product.model";
import { TUser } from "../Users/user.interface";
import OrderModel from "./order.model";
import  httpStatus  from "http-status";
import { orderUtils } from "./order.utils";
import { Order } from "./order.interface";
//creating a order
const createOrderIntoDb = async (user: TUser,
  payload: { products: { product: string; quantity: number }[] },client_ip: string)=>{
    if (!payload?.products?.length)
      throw new APPerror(httpStatus.NOT_ACCEPTABLE, "Order is not specified");
  
    const products = payload.products;
  
    let totalPrice = 0;
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await ProductModel.findById(item.product);
        if (product) {
          const subtotal = product ? (product.price || 0) * item.quantity : 0;
          totalPrice += subtotal;
          return item;
        }
      })
    );

    let order = await OrderModel.create({
      user,
      products: productDetails,
      totalPrice,
    });
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: "BDT",
      customer_name: user.name,
      customer_email: user.email,
      customer_address: user.address,
      customer_phone: user.phone,
      customer_city: user.city,

      client_ip,
    };
  
    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
    console.log(payment)
  
  
    if (payment?.transactionStatus) {
      order = await order.updateOne({
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      });
    }
  
    return payment.checkout_url
}
//getting revenue
const getRevenueFromDb = async () =>{

  
    const revenue = await OrderModel.aggregate([
      {
        $project: {
          total: { $multiply: ["$quantity", "$totalPrice"] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
      {
        $project:{ _id:0}
      }
    ]);
  return revenue[0];
  };
 
const getAllOrdersFromDb = async () => {
  const orders = await OrderModel.find().populate('user');
  return orders;
}
const checkSinglePayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }

  return verifiedPayment;
};


const updateOrderFromDb = async (id: string, data: Order) => {
  const result = await OrderModel.findByIdAndUpdate(id, data, {
      new: true
  })
  return result

}
const deleteOrderFromDb = async (id: string) => {
  const result = await OrderModel.findByIdAndDelete(id)
  return result

}





export const orderServices ={ createOrderIntoDb, getRevenueFromDb, getAllOrdersFromDb ,checkSinglePayment,updateOrderFromDb,deleteOrderFromDb }