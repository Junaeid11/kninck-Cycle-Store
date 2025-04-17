"use client";

import { useState, useEffect } from "react";
import NMContainer from "@/components/ui/core/NMContainer";
import { getAllCategories } from "@/services/Category";

import { ICategory } from "@/types/category";
import CategoryCard from "@/components/ui/core/Category";

export default function Category() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await getAllCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  return (
    <NMContainer >
      <div className="relative flex items-center justify-center  min-h-[10rem]">
        <h2 className="text-[10rem] font-extrabold text-gray-100 absolute top-6 left-1/2 transform -translate-x-1/2 pointer-events-none z-0">
          CATEGORY
        </h2>
        <div className="relative z-10 text-center">
          <h3 className="text-4xl font-bold text-gray-900">Special Category</h3>
          <div className="w-10 h-1 bg-red-500 mx-auto mt-2 " />
        </div>
      </div>



      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
        {categories.map((category, idx) => (
          <CategoryCard key={idx} category={category} />
        ))}


      </div>
    </NMContainer>
  );
}
