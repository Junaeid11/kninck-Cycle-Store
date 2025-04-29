"use client";

import { useEffect, useState } from "react";
import { getAllMeal } from "@/services/meal";
import { IProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllCategories } from "@/services/Category";
import { FaSearch } from "react-icons/fa";
import { ShoppingCart, Star } from "lucide-react";

import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import { addProduct } from "@/redux/features/cartSlice";

const FindProducts = () => {
  const [meals, setMeals] = useState<IProduct[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [price, setPrice] = useState(1999);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState<string | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 6;

 const ratings = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const { data } = await getAllMeal();
        setMeals(data);
        setFilteredMeals(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meals:", error);
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const dispatch = useAppDispatch();

  const handleAddProduct = (meal: IProduct) => {
    toast.success("Product added to Cart!");
    dispatch(addProduct(meal));
  };

  useEffect(() => {
    let updatedMeals = [...meals];

    if (searchTerm) {
      updatedMeals = updatedMeals.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ratingFilter !== null) {
      updatedMeals = updatedMeals.filter(
        (meal) => meal.rating !== undefined && meal.rating >= ratingFilter
      );
    }

    if (selectedCategories.length > 0) {
      updatedMeals = updatedMeals.filter((meal) => selectedCategories.includes(meal.category?._id));
    }

    

    updatedMeals = updatedMeals.filter((meal) => meal.price <= price);

    if (stockFilter === "inStock") {
      updatedMeals = updatedMeals.filter((meal) => meal.stock > 0);
    } else if (stockFilter === "outOfStock") {
      updatedMeals = updatedMeals.filter((meal) => meal.stock === 0);
    }

    setFilteredMeals(updatedMeals);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, ratingFilter, selectedCategories, selectedDietaryTags, stockFilter, price, meals]);

  if (loading) return <Loading />;

  // Pagination Logic
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const paginatedMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);

  return (
    <div className="p-4 md:p-6 w-full flex flex-col md:flex-row gap-6">
    {/* Sidebar Filter */}
    <div className="w-full md:w-72">
      <Card className="p-4 rounded-2xl shadow-md">
        <CardContent>
          {/* Price Filter */}
          <h2 className="text-lg font-semibold mb-4">Filter By Price</h2>
          <Slider
            defaultValue={[price]}
            max={3000}
            onValueChange={(val) => setPrice(val[0])}
          />
          <p className="mt-2">${price}</p>
  
          {/* Category Filter */}
          <h2 className="text-lg font-semibold mt-6">Category</h2>
          {categories.map((category) => (
            <div key={category._id} className="flex items-center gap-2 mt-1">
              <Checkbox
                checked={selectedCategories.includes(category._id)}
                onCheckedChange={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(category._id)
                      ? prev.filter((id) => id !== category._id)
                      : [...prev, category._id]
                  )
                }
              />
              <span>{category.name}</span>
            </div>
          ))}
  
          {/* Rating Filter */}
          <h2 className="text-lg font-semibold mt-6">Rating</h2>
          <ul className="space-y-2 mt-2">
            {ratings.map((rating) => (
              <li key={rating} className="flex items-center gap-2">
                <Checkbox
                  checked={ratingFilter === rating}
                  onCheckedChange={() =>
                    setRatingFilter((prev) => (prev === rating ? null : rating))
                  }
                />
                <span className="text-yellow-500">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  
    {/* Product List */}
    <div className="flex-1 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Products</h2>
  
      {/* Search Bar */}
      <div className="relative w-full mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search meals..."
          className="w-full p-3 pl-10 border rounded-lg shadow-sm text-sm sm:text-base"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
  
      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMeals.map((meal) => (
          <div
            key={meal._id}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
          >
            <Card className="border-none shadow-none p-0 bg-sky-100">
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
                      <ShoppingCart className="w-5 h-5 text-blue-500" />
                    </Button>
                  </motion.div>
                </motion.div>
              </CardHeader>
  
              {/* Meal Info */}
              <CardContent className="p-4">
                <Link href={`/find-products/${meal._id}`} passHref>
                  <CardTitle className="text-lg font-semibold text-gray-800 hover:text-violet-600 transition cursor-pointer">
                    {meal?.name.length > 22
                      ? `${meal.name.slice(0, 22)}...`
                      : meal.name}
                  </CardTitle>
                </Link>
  
                <div className="flex items-center justify-between mt-3 text-sm">
                  {/* Price */}
                  <div className="font-semibold text-red-500 text-base">
                    {meal.discountPrice ? (
                      <>
                        <span className="line-through text-gray-400 mr-1">
                          ${meal.price.toFixed(2)}
                        </span>
                        ${meal.discountPrice.toFixed(2)}
                      </>
                    ) : (
                      `$${meal.price.toFixed(2)}`
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
          </div>
        ))}
      </div>
  
      {/* Pagination */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 items-center">
        <Button
          className="bg-sky-400 text-black"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="bg-sky-400 text-black"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  </div>
  
  
  );
};

export default FindProducts;
