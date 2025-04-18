"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";
import { IProduct as IProduct } from "@/types/product";

const ProductsDetails = ({ meal }: { meal: IProduct }) => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(meal?.imageUrls[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleAddToCart = () => {
    dispatch(addProduct(meal));
  };

  return (
    <div className="bg-white/75 border-2 py-12 px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12  mx-auto">
        {/* Left: Main Image + Thumbnails */}
        <div>
          <div className="w-full  rounded-lg overflow-hidden shadow-lg">
            <Image
              src={selectedImage}
              alt={meal.name}
              width={400}
              height={400}
              className="rounded-md"
            />
          </div>

          <div className="flex gap-4 mt-4 overflow-x-auto">
            {meal?.imageUrls.map((img, idx) => (
              <div
                key={idx}
                className={`relative w-24 h-24 rounded-md border-2 cursor-pointer ${selectedImage === img ? "border-red-500" : "border-gray-300"}`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt="thumbnail"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-gray-900">{meal.name}</h1>
          <p className="text-sm text-yellow-600">0 Customer Reviews</p>

          <div className="flex items-center gap-4 text-2xl">
            <span className="text-red-600 font-semibold">${meal.discountPrice}</span>
            <span className="line-through text-gray-500 text-xl">${meal.price}</span>
          </div>

          {/* Variants: Colors */}
          <div className="mt-4">
            <p className="font-medium mb-2">Colors:</p>
            <div className="flex gap-2">
              {meal.variants?.colors?.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Variants: Sizes */}
          <div className="mt-4">
            <p className="font-medium mb-2">Size:</p>
            <div className="flex gap-3 flex-wrap">
              {meal.variants?.sizes?.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border transition-all text-sm ${
                    selectedSize === size
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-6">
            <Button
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3"
            >
              Add To Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs: Description & Reviews */}
      <div className="max-w-5xl mx-auto mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="border-b mb-6">
            <TabsTrigger value="description" className="text-lg px-6 py-2">Description</TabsTrigger>
            <TabsTrigger value="reviews" className="text-lg px-6 py-2">Reviews</TabsTrigger>
          </TabsList>

          {/* Description */}
          <TabsContent value="description">
            <div className="text-gray-700 leading-7 space-y-4 border p-6 rounded-md shadow-sm bg-gray-50">
              <p>{meal.description}</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm mt-4">
                <p><strong>Category:</strong> {meal.category.name}</p>
                <p><strong>Frame:</strong> {meal.specs?.frame}</p>
                <p><strong>Brakes:</strong> {meal.specs?.brakes}</p>
                <p><strong>Weight:</strong> {meal.specs?.weight}</p>
                <p><strong>Stock:</strong> {meal.inStock ? "Available" : "Out of Stock"}</p>
              </div>
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews">
            {meal.reviews && meal.reviews.length > 0 ? (
              <div className="space-y-4 bg-gray-50 p-6 rounded-md border shadow-sm">
                {meal.reviews.map((review, idx) => (
                  <div key={idx} className="border-b pb-3">
                    <p className="text-sm font-semibold">{review.user}</p>
                    <p className="text-yellow-500 flex items-center gap-1">
                      <Star fill="gold" stroke="gold" className="w-4 h-4" /> {review.rating}
                    </p>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to write one!</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsDetails;
