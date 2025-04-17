"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/redux/hooks";
import { addProduct } from "@/redux/features/cartSlice";
import { IMeal } from "@/types/meal";

const ProductsDetails = ({ meal }: { meal: IMeal }) => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(meal?.imageUrls[0]);

  const handleAddToCart = () => {
    dispatch(addProduct(meal));
  };

  return (
    <div className="bg-white py-10 px-4 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        {/* Images */}
        <div>
          <Image
            src={selectedImage}
            alt={meal.name}
            width={600}
            height={600}
            className="rounded-xl object-cover w-full shadow-lg"
          />
          <div className="flex gap-4 mt-4">
            {meal?.imageUrls.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt="thumbnail"
                width={100}
                height={100}
                className={`cursor-pointer border-2 rounded-md w-24 h-24 object-cover ${
                  selectedImage === img ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{meal.name}</h1>
          <p className="text-gray-600 text-lg">Brand: <strong>{meal.brand}</strong></p>
          <p className="text-yellow-500 flex items-center">
            <Star fill="gold" stroke="gold" className="w-5 h-5 mr-1" />
            {meal.rating} <span className="ml-2 text-gray-600">({meal.reviews?.length || 0} Reviews)</span>
          </p>

          <div className="my-4">
            <span className="text-red-600 text-2xl font-semibold mr-2">${meal.discountPrice}</span>
            {meal.price && (
              <span className="line-through text-gray-500">${meal.price}</span>
            )}
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 text-sm text-gray-700 gap-2 mb-4">
            <p><strong>Frame:</strong> {meal.specs?.frame}</p>
            <p><strong>Brakes:</strong> {meal.specs?.brakes}</p>
            <p><strong>Weight:</strong> {meal.specs?.weight}</p>
            <p><strong>Stock:</strong> {meal.inStock ? "Available" : "Out of Stock"}</p>
            <p><strong>Quantity:</strong> {meal.quantity}</p>
          </div>

          {/* Variants */}
          <div className="mb-4">
            <p className="text-sm mb-1"><strong>Colors:</strong> {meal.variants?.colors?.join(", ")}</p>
            <p className="text-sm"><strong>Sizes:</strong> {meal.variants?.sizes?.join(", ")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button onClick={handleAddToCart} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white">
              Add To Cart
            </Button>
            <Button className="w-full sm:w-auto bg-black hover:bg-gray-900 text-white">
              Buy Now
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Add To Wishlist
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mt-10">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="border-b mb-6">
            <TabsTrigger value="description" className="text-lg px-6 py-2">Description</TabsTrigger>
            <TabsTrigger value="reviews" className="text-lg px-6 py-2">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <div className="text-gray-700 leading-7 space-y-3">
              <p>{meal.description}</p>
              <p><strong>Category Name</strong> {meal.category.name}</p>
              <p><strong>Slug:</strong> {meal.slug}</p>
              <p><strong>Product ID:</strong> {meal._id}</p>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            {meal.reviews && meal.reviews.length > 0 ? (
              <div className="space-y-4">
                {meal.reviews.map((review, idx) => (
                  <div key={idx} className="border-b pb-3">
                    <p className="text-sm font-semibold">{review.user}</p>
                    <p className="text-yellow-500 flex items-center">
                      <Star fill="gold" stroke="gold" className="w-4 h-4 mr-1" /> {review.rating}
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
