import { Request, Response } from "express";
import { orderServices } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
//for creating a Order
const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await orderServices.createOrderIntoDb(user, req.body, req.ip!);
  console.log(order)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order placed successfully",
    data: order,

  });
});
//for getting revenue
const getRevenue = async (req: Request, res: Response) => {
  try {
    const data = await orderServices.getRevenueFromDb();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: data
    })
  }
  catch (err) {
    res.status(400).json({
      message: "Revenue calculated failed",
      success: false,
      err
    })
  }
}
//for getting all orders
const getOrders = catchAsync(async (req: Request, res: Response) => {
  const data = await orderServices.getAllOrdersFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: data,
  });
});


const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderServices.checkSinglePayment(req.query.order_id as string);
  console.log(order)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order verified successfully",
    data: order,
  });
});
const updateOrder = catchAsync(async (req, res) => {
  const result = req.params.id
  const orderData = req.body
  const data = await orderServices.updateOrderFromDb(result, orderData)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order updated successfully",
    data: data,
  });
});
const deletedOrder = catchAsync(async (req, res) => {
  const data = req.params.id
  const order = orderServices.deleteOrderFromDb(data)
  console.log(order)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Order deleted successfully",
    data: order,
  });
});






export const orderController = {
  createOrder,
  getRevenue,
  getOrders,
  verifyPayment,
  deletedOrder,
  updateOrder


}