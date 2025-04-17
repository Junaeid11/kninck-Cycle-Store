import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/appError';
import { IImageFiles } from '../../interface/IImageFile';
import QueryBuilder from '../../builder/QueryBuilder';
import { Review } from '../review/review.model';
import mealModel from './meal.model';
import { JwtPayload } from 'jsonwebtoken';
import User from '../user/user.model';

const createMeal = async (
   mealData: Partial<BiCycle>,
   productImages: IImageFiles,
   decoded: JwtPayload
) => {
   const { images } = productImages;

   if (!images || images.length === 0) {
      throw new AppError(
         StatusCodes.BAD_REQUEST,
         'Meal images are required.'
      );
   }
   mealData.imageUrls = images.map((image) => image.path);

   const newProduct = new mealModel({
      ...mealData,
   });
   const result = await newProduct.save();

   return {
      result,
   };

};


import mongoose from "mongoose";
import { BiCycle } from './cycle.interface';

const getAllMeal = async (query: Record<string, unknown>) => {
   const {
      category,
      minPrice,
      maxPrice,
      inStock,
      ratings,
      dietaryTags,
      ...pQuery
   } = query;

   const filter: Record<string, any> = {};

   if (inStock !== undefined) {
      filter.stock = inStock === 'true' ? { $gt: 0 } : 0;
   }
   if (category) {
      try {
         filter.category = new mongoose.Types.ObjectId(category as string);
      } catch (error) {
         console.error("Invalid category ID:", category);
      }
   }
   if (ratings) {
      const ratingArray = typeof ratings === "string"
         ? ratings.split(",")
         : Array.isArray(ratings) ? ratings : [ratings];

      filter.averageRating = { $in: ratingArray.map(Number) };
   }
   if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
   }
 
   const mealQuery = new QueryBuilder(
      mealModel.find(filter).populate("category"),
      pQuery
   )
      .search(["name", "description"])
      .filter()
      .sort()
      .paginate()
      .fields();

   const meals = await mealQuery.modelQuery.lean();

   const meta = await mealQuery.countTotal();

   return { meta, result: meals };
};


const getSingleMeal = async (mealId: string) => {
   const meal = await mealModel.findById(mealId).populate('category')
      ;

   if (!meal) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Meal not found');
   }
   const reviews = await Review.find({ meal: meal._id });

   const productObj = meal.toObject();

   return {
      ...productObj,
      reviews
   };
};
const updateMeal = async (
   mealId: string,
   payload: Partial<BiCycle>,
   productImages: IImageFiles,
   authUser: JwtPayload
) => {
   const { images } = productImages;

   const user = await User.findById(authUser.userId);
   const meal = await mealModel.findOne({
      _id: mealId,
   });

   if (!user?.isActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
   }
   if (!meal) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Meal Not Found');
   }

   if (images && images.length > 0) {
      payload.imageUrls = images.map((image) => image.path);
   }

   return await mealModel.findByIdAndUpdate(mealId, payload, { new: true });
};

const deleteMeal = async (mealId: string, authUser: JwtPayload) => {
   const user = await User.findById(authUser.userId);
   const meal = await mealModel.findOne({
      _id: mealId,
   });

   if (!user?.isActive) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active');
   }
   if (!meal) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Product Not Found');
   }

   return await mealModel.findByIdAndDelete(mealId);
};




export const ProductService = {
   createMeal,
   getAllMeal,
   getSingleMeal,
   updateMeal,
   deleteMeal
}
