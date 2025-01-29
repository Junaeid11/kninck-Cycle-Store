import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Users/user.contant";
const OrderRouter = Router()
OrderRouter.post('/',auth(USER_ROLE.user), orderController.createOrder)

OrderRouter.get('/',auth(USER_ROLE.admin , USER_ROLE.user) ,orderController.getOrders)
OrderRouter.get('/verify', auth(USER_ROLE.user),orderController.verifyPayment)
OrderRouter.delete('/:id',orderController.deletedOrder)
OrderRouter.patch('/:id',orderController.updateOrder)

export default OrderRouter  