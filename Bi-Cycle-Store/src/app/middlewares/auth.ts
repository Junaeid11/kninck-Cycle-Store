import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";

import config from "../config";
import catchAsync from "../utils/catchAsync";
import { User } from "../modules/Users/user.model";
import { APPerror } from "../errors/AppError";


const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new APPerror(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email,} = decoded;
    const user = await User.findOne({ email });
    if(user?.status === "blocked"){
      throw new APPerror(httpStatus.UNAUTHORIZED, "You are blocked")
    }

    if (!user) {
      throw new APPerror(httpStatus.NOT_FOUND, "This user is not found !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new APPerror(
        httpStatus.UNAUTHORIZED,
        "You are not authorized"
      );
    }

    req.user = user;
    next();
  });
};

export default auth;
