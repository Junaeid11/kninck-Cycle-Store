import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from "http-status";
import { UserService } from "./user.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.registerUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data,

  })
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken: data,
    },
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getUserFromDb();
  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: "Users retrieved successfully",
    data
  
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await UserService.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  

  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  });
});





export const UserController = {
  registerUser,
  getAllUsers,
  loginUser,
  changePassword,
  changeStatus

};
