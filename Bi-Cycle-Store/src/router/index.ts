import { Router } from "express";
import ProductRouter from "../app/modules/Bicyles/product.route";
import userRouter from "../app/modules/Users/user.route";
import OrderRouter from "../app/modules/Orders/order.route";
const router = Router();

router.use("/user", userRouter);
router.use("/products",ProductRouter );
router.use("/orders", OrderRouter);

export default router;
