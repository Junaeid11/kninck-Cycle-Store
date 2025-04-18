"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/types/product";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductCard = ({ meal }: { meal: IProduct }) => {
  const { user } = useUser();
  const dispatch = useAppDispatch();

  const handleAddProduct = (meal: IProduct) => {
    toast.success("Meal added to Cart!");
    dispatch(addProduct(meal));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
    >
      <Card className="border-none shadow-none p-0 bg-sky-100 ">
        <CardHeader className="relative p-0">
          {/* Discount Badge */}
          {meal?.discountPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow">
              Save {(((meal.price - meal.discountPrice) / meal.price) * 100).toFixed(0)}%
            </div>
          )}
          <motion.div
            className="relative w-full h-48 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={
                meal?.imageUrls[0] ||
                "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
              }
              alt={meal?.name}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-300"
            />

            {/* Overlay with Add to Cart */}
            <motion.div
              whileHover={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center transition duration-300"
            >
              <Button
                onClick={() => handleAddProduct(meal)}
                className="bg-white text-gray-800 hover:bg-gray-100 p-3 rounded-full shadow-lg"
              >
                <ShoppingCart className="w-5 text-blue-500 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </CardHeader>

        {/* Meal Info */}
        <CardContent className="p-4">
          <Link href={`/find-products/${meal._id}`} passHref>
            <CardTitle className="text-lg font-semibold text-gray-800 hover:text-violet-600 transition cursor-pointer">
              {meal?.name.length > 22
                ? `${meal?.name?.slice(0, 22)}...`
                : meal?.name}
            </CardTitle>
          </Link>

          <div className="flex items-center justify-between mt-3 text-sm">
            {/* Price Section */}
            <div className="font-semibold text-red-500 text-base">
              {meal?.discountPrice ? (
                <>
                  <span className="line-through text-gray-400 mr-1">
                    ${meal?.price.toFixed(2)}
                  </span>
                  ${meal?.discountPrice.toFixed(2)}
                </>
              ) : (
                `$${meal?.price.toFixed(2)}`
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" fill="orange" />
              <span className="text-gray-600 text-sm">4.5</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
