import {  Types } from "mongoose";


export interface BiCycle {
  isModified(arg0: string): unknown;
  name: string;
  brand: string;
  price: number;
  discountPrice: number;
  isActive: boolean;
  slug: string;
  category: Types.ObjectId;
  description: string;
  imageUrls: string[];
  quantity: number;
  inStock?: boolean;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
  specs?: {
    frame?: string;
    brakes?: string;
    battery?: string;
    range?: string;
    motor?: string;
    topSpeed?: string;
    weight?: string;
  };
 rating?: number;
  reviews?: {
    user: string;
    comment: string;
    rating: number;
    date: string;
  }[];

  variants?: {
    colors?: string[];
    sizes?: string[];
  };

}
