"use client";

import { useEffect, useState } from "react";
import { getAllMeal } from "@/services/meal";
import { IProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "@/components/ui/loading";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllCategories } from "@/services/Category";
import { FaSearch } from "react-icons/fa";

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
          <h2 className="text-lg font-semibold mb-4">Filter By Price</h2>
          <Slider defaultValue={[price]} max={3000} onValueChange={(val) => setPrice(val[0])} />
          <p className="mt-2">${price}</p>
  
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
            className="bg-white shadow-md rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group cursor-pointer"
          >
            <div className="overflow-hidden rounded-lg">
              <Image
                width={100}
                height={100}
                src={meal.imageUrls[0]}
                alt={meal.name}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-semibold mt-3 text-gray-800 group-hover:text-red-500 transition-colors duration-200">
              {meal.name}
            </h3>
            <p className="text-yellow-500 text-sm mt-1">⭐ {meal.rating}</p>
            <p className="text-red-500 font-bold text-base mt-1">${meal.price}</p>
            <Link href={`/find-products/${meal._id}`} className="block mt-3">
              <Button className="w-full bg-sky-500 transition-all duration-200 group-hover:bg-blue-400 group-hover:text-white">
                See Details
              </Button>
            </Link>
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
