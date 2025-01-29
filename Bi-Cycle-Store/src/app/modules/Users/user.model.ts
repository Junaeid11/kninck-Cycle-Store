import mongoose, { Schema } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    immutable: true
  },
  password: {
    type: String,
    required: true,

  },
  role: {
    enum: ['admin', 'customer'],
    type: String,
    default: 'customer'
  },
  status:{
    type: String,
    enum: ['Active', 'Blocked'],
    default:'Active'

  },
  phone: { type: String, default: "N/A" },
  address: { type: String, default: "N/A" },
  city: { type: String, default: "N/A" },
})

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password,
      parseInt(config.bcrypt_salt_rounds as string)
  )
  next()
}
)

export const User = mongoose.model<TUser, TUserModel>("User", UserSchema);