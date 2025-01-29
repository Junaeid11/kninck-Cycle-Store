import { Router } from "express";
import { UserController } from "./user.controller";
import  validateRequest  from "../../middlewares/validateRequest";
import { validation } from "./user.validation";
import { USER_ROLE } from "./user.contant";
import auth from "../../middlewares/auth";


const userRouter = Router();

userRouter.post("/register", validateRequest(validation), UserController.registerUser);
userRouter.post("/login", UserController.loginUser);
userRouter.get('/',UserController.getAllUsers)
userRouter.post('/change-password',auth(USER_ROLE.user,USER_ROLE.admin),UserController.changePassword)
userRouter.patch('/change-status/:id',auth(USER_ROLE.admin),UserController.changeStatus)

export default userRouter;
