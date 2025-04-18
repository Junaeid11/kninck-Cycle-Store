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
      <section className=" lg:py-5 bg-white text-center relative overflow-hidden">
        {/* Background Title */}
        <h2 className="text-[3rem] lg:text-[6rem] font-extrabold text-gray-100 absolute top-6 left-1/2 transform -translate-x-1/2 pointer-events-none z-0">
          CATEGORY
        </h2>

        {/* Main Title */}
        <div className="relative z-10 lg:pb-7">
          <h3 className="text-4xl font-bold text-gray-900">Special Categories</h3>
          <div className="w-10 h-1 bg-red-500 mx-auto mt-2 mb-12" />
        </div>
        <div className="grid mx-5 grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
          {categories.map((category, idx) => (
            <CategoryCard key={idx} category={category} />
          ))}


        </div>
      </section>
    </NMContainer>


  );
}
