

import { APPerror } from "../../errors/AppError";
import config from "../../config";
import { TUser, TUserModel } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt'

const registerUser = async (userData: TUser) => {
  const user = new User(userData);
  console.log(user);
  await user.save();
  return user;
};


const loginUser = async (payload: TUser) => {
    const user = await User.findOne({ email: payload.email }).select(
      "password email role"
    );
    console.log(user);
  
    if (!user ) {
     throw new APPerror(httpStatus.FORBIDDEN, "Invalid email or password");
    }
    const isPasswordValid = await user.comparePassword(payload.password);
console.log("Password Valid:", isPasswordValid);

if (!isPasswordValid) {
  throw new Error("Invalid email or password");
}
  
    const JwtPayload = {
      email: user.email,
      role: user.role as string
  }
  const token = createToken(JwtPayload, config.jwt_access_secret as string, '1d');
   return token;

  };

const getUserFromDb = async()=>{
  const result = User.find()
  return result

}  
const changePassword = async (
  userData: JwtPayload,
  payload: TUser,
) => {
  const user = await User.findOne({email: userData.email})
  console.log(user)
  if(!user){
    throw new APPerror(httpStatus.NOT_FOUND, "User not Found")
  }

  const oldPassword = await user.comparePassword(payload.oldPassword)

  if(!oldPassword){
    throw new APPerror(httpStatus.FORBIDDEN, 'Old password does not match');
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};


const changeStatus = async (id: string, data: TUserModel) => {
  const result = await User.findByIdAndUpdate(id, data, {
      new: true
  })
  return result

}









export const UserService = {
  registerUser,
  loginUser,
  getUserFromDb,
  changePassword,
  changeStatus

};
